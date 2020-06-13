import { JobTypes } from "./../../jobs/job_types";
import WorldState from "../../world_state";
import Employee from "../../employees/employee";
import PlayerAttributes from "../../player_attributes";
import TraitStorage from "../../trait_storage/trait_storage";
import TraitsSet from "../../trait_storage/traits_set";
import IAction from "./IAction";
import PrelifeMap from "../../prelife_map/prelife_map";

const deliveryActionTypes = {
	Fetching: "Fetching",
	Travelling: "Travelling",
	Delivering: "Delivering",
	Returning: "Returning",
};

const deliveryActions: Array<IAction> = [
	{
		action: deliveryActionTypes.Fetching,
		nextAction: deliveryActionTypes.Travelling,
		getSpeed(attributes: PlayerAttributes) {
			return attributes.simple_task_baseSpeed;
		},
	},
	{
		action: deliveryActionTypes.Travelling,
		nextAction: deliveryActionTypes.Delivering,
		getSpeed(attributes: PlayerAttributes) {
			// TK yeah this is stupid but it's less stupid than how I previously did it... refactor later!
			console.error(
				"bug elsewhere! shouldn't be calling getSpeed for a travelling job"
			);
			return 0;
		},
	},
	{
		action: deliveryActionTypes.Delivering,
		nextAction: deliveryActionTypes.Returning,
		getSpeed(attributes: PlayerAttributes) {
			return attributes.simple_task_baseSpeed;
		},
	},
	{
		action: deliveryActionTypes.Returning,
		nextAction: deliveryActionTypes.Fetching,
		getSpeed(attributes: PlayerAttributes) {
			// TK yeah this is stupid but it's less stupid than how I previously did it... refactor later!
			console.error(
				"bug elsewhere! shouldn't be calling getSpeed for a travelling job"
			);
			return 0;
		},
	},
];

export const deliverers_tick = {
	enabled: true,
	id: "DELIVERERS_TICK",
	priority: 23,

	run(worldState: WorldState, delta_sec: number) {
		const { employees, playerAttributes: attributes, storage } = worldState;

		const deliverers = employees.all.filter(
			(a) => a.assignedJob === JobTypes.Delivering
		);

		if (deliverers.length === 0) return;

		deliverers.forEach((d) =>
			tickDeliverer(d, attributes, storage, worldState, delta_sec)
		);
	},
};

function tickDeliverer(
	emp: Employee,
	attributes: PlayerAttributes,
	storage: TraitStorage,
	worldState: WorldState,
	delta_sec: number
) {
	// TK: quite possibly all this should be shared among ALL employees and only their list of actions
	// changes when a job is assigned...
	if (!emp.currentAction) {
		emp.currentAction = deliveryActions[0].action;
	}

	const action = deliveryActions.find((a) => a.action === emp.currentAction);
	if (!action) return;

	switch (action.action) {
		case deliveryActionTypes.Fetching:
		case deliveryActionTypes.Delivering:
			const currentWorkSpeed =
				action.getSpeed(attributes) * attributes.overallWorkFactor * delta_sec;

			emp.currentWorkSpeed = currentWorkSpeed;
			emp.currentJobProgress += currentWorkSpeed;

			emp.secsSinceCompleted += delta_sec;

			break;
		case deliveryActionTypes.Travelling:
		case deliveryActionTypes.Returning:
			emp.currentJobProgress = 0;
			emp.secsSinceCompleted += delta_sec;
			handleMoving(emp, action, worldState.prelifeMap, worldState);
			break;
		default:
			console.log(`unknown deliverer action: ${action.action}`);
			break;
	}

	let completed = 0;
	while (emp.currentJobProgress >= 100) {
		completed++;
		emp.currentJobProgress -= 100;
	}

	if (completed > 0) {
		handleCompletions(emp, action, storage, attributes, worldState);
	}
}

function handleCompletions(
	emp: Employee,
	action: IAction,
	storage: TraitStorage,
	attributes: PlayerAttributes,
	worldState: WorldState
) {
	emp.currentJobProgress = 0;

	switch (action.action) {
		case deliveryActionTypes.Fetching:
			// pick up traits
			if (storage.canRemove(attributes.minimumDeliveryBatchSize)) {
				// as long as we can take our minimum we take as many as exist in storage up to the current carry capacity
				emp.carrying = storage.removeTraits(attributes.deliveryCarryCapacity);

				if (emp.carrying.getTotal() >= attributes.minimumDeliveryBatchSize) {
					if (emp.currentTile.nextTileOnRoute) {
						emp.setDestinationTile(emp.currentTile.nextTileOnRoute);
					}

					emp.currentAction = action.nextAction;
				}
			} else {
				// nothing to fetch, remain in fetching state
			}

			break;
		case deliveryActionTypes.Delivering:
			// perform the delivery
			const toDeliver = emp.carrying ?? new TraitsSet();
			if (toDeliver.getTotal() === 0) {
				// indicates a bug elsewhere but won't affect behaviour
				console.error("Unexpectedly delivering 0 traits.");
			}
			worldState.shop.deliverTraitsSet(toDeliver, worldState);
			const delivered = toDeliver.getTotal();

			emp.carrying = undefined;

			emp.secsSinceCompleted = 0;
			emp.completedMessage = `+${delivered}`;
			// TK: add experience gain

			if (emp.currentTile.prevTileOnRoute) {
				emp.setDestinationTile(emp.currentTile.prevTileOnRoute);
			}

			emp.currentAction = action.nextAction;

			break;
		default:
			console.error("Invalid action: " + action.action);
			break;
	}
}

function handleMoving(
	emp: Employee,
	action: IAction,
	map: PrelifeMap,
	worldState: WorldState
) {
	const finalDestination =
		action.action === deliveryActionTypes.Travelling
			? map.getShopTile()
			: map.getComplexTile();

	if (emp.currentTile.is(finalDestination)) {
		emp.setDestinationTile(undefined);
		emp.currentAction = action.nextAction;
		return;
	}

	if (emp.currentTile.is(emp.destinationTile)) {
		const nextTile =
			action.action === deliveryActionTypes.Travelling
				? emp.currentTile.nextTileOnRoute
				: emp.currentTile.prevTileOnRoute;
		if (nextTile) {
			emp.setDestinationTile(nextTile);
		}
	}
}
