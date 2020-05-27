import { toast } from "react-toastify";
import { ITraitGenerator } from "./../../traits/generator/ITraitGenerator";
import moment from "moment";
import { JobTypes } from "./../../jobs/job_types";
import WorldState from "../../world_state";
import Employee from "../../employees/employee";
import PlayerAttributes from "../../player_attributes";
import TraitStorage from "../../trait_storage/trait_storage";
import TraitsSet from "../../trait_storage/traits_set";

interface IAction {
	action: string;
	nextAction: string;
	baseSpeed: number;
}

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
		baseSpeed: 40,
	},
	{
		action: deliveryActionTypes.Travelling,
		nextAction: deliveryActionTypes.Delivering,
		baseSpeed: 5,
	},
	{
		action: deliveryActionTypes.Delivering,
		nextAction: deliveryActionTypes.Returning,
		baseSpeed: 40,
	},
	{
		action: deliveryActionTypes.Returning,
		nextAction: deliveryActionTypes.Fetching,
		baseSpeed: 5,
	},
];

export const deliverers_tick = {
	enabled: true,
	id: "DELIVERERS_TICK",
	priority: 23,

	run(worldState: WorldState, delta_sec: number) {
		const {
			employees,
			playerAttributes: attributes,
			traitGenerator: generator,
			storage,
		} = worldState;

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

	emp.currentJobProgress +=
		action.baseSpeed * attributes.overallWorkFactor * delta_sec;

	emp.secsSinceCompleted += delta_sec;

	let completed = 0;
	while (emp.currentJobProgress >= 100) {
		completed++;
		emp.currentJobProgress -= 100;
	}

	if (completed > 0) {
		emp.currentJobProgress = 0;

		// amount of completions matters

		// TK: add experience gain
		switch (action.action) {
			case deliveryActionTypes.Fetching:
				// pick up traits
				if (storage.canRemove(attributes.minimumDeliveryBatchSize)) {
					// as long as we can take our minimum we take as many as exist in storage up to the current carry capacity
					emp.carrying = storage.removeTraits(attributes.deliveryCarryCapacity);

					if (emp.carrying.getTotal() >= attributes.minimumDeliveryBatchSize) {
						emp.currentAction = action.nextAction;
					}
				}
				break;
			case deliveryActionTypes.Travelling:
				// nothing to do, just arrive
				emp.currentAction = action.nextAction;
				break;
			case deliveryActionTypes.Delivering:
				// perform the delivery
				const toDeliver = emp.carrying || new TraitsSet();
				if (toDeliver.getTotal() === 0) {
					// indicates a bug elsewhere but won't affect behaviour
					console.error("Unexpectedly delivering 0 traits.");
				}
				worldState.shop.deliverTraitsSet(toDeliver, worldState);
				const delivered = toDeliver.getTotal();

				emp.carrying = undefined;
				emp.currentAction = action.nextAction;
				emp.secsSinceCompleted = 0;
				emp.completedMessage = `+${delivered}`;
				break;
			case deliveryActionTypes.Returning:
				// nothing to do, just arrive
				emp.currentAction = action.nextAction;
				break;
			default:
				console.error("Invalid action: " + action.action);
				break;
		}
	}
}
