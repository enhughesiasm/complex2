import { JobTypes } from "./../../jobs/job_types";
import WorldState from "../../world_state";
import Employee from "../../employees/employee";
import PlayerAttributes from "../../player_attributes";
import Inventory from "../../inventory/inventory";
import IAction from "./IAction";
import PrelifeMap from "../../prelife_map/prelife_map";
import rarities from "../../traits/rarity_levels";
import Research from "../../research/research";

const gathererActionTypes = {
	Travelling: "Travelling",
	Gathering: "Gathering",
	Returning: "Returning",
};

const gathererActions: Array<IAction> = [
	{
		action: gathererActionTypes.Travelling,
		nextAction: gathererActionTypes.Gathering,
		getSpeed(attributes: PlayerAttributes, research: Research) {
			// TK yeah this is stupid but it's less stupid than how I previously did it... refactor later!
			console.error(
				"bug elsewhere! shouldn't be calling getSpeed for a travelling job"
			);
			return 0;
		},
	},
	{
		action: gathererActionTypes.Gathering,
		nextAction: gathererActionTypes.Returning,
		getSpeed(attributes: PlayerAttributes, research: Research) {
			return attributes.e_gath_baseSpeed;
		},
	},
	{
		action: gathererActionTypes.Returning,
		nextAction: gathererActionTypes.Travelling,
		getSpeed(attributes: PlayerAttributes, research: Research) {
			// TK yeah this is stupid but it's less stupid than how I previously did it... refactor later!
			console.error(
				"bug elsewhere! shouldn't be calling getSpeed for a travelling job"
			);
			return 0;
		},
	},
];

export const gatherers_tick = {
	enabled: true,
	id: "GATHERERS_TICK",
	priority: 21,

	run(worldState: WorldState, delta_sec: number) {
		const { employees, playerAttributes: attributes, inventory } = worldState;

		const gatherers = employees.all.filter(
			(a) => a.assignedJob === JobTypes.Gathering
		);

		if (gatherers.length === 0) return;

		gatherers.forEach((g) =>
			tickGatherer(g, attributes, inventory, worldState, delta_sec)
		);
	},
};

function tickGatherer(
	emp: Employee,
	attributes: PlayerAttributes,
	inventory: Inventory,
	worldState: WorldState,
	delta_sec: number
) {
	// TK: quite possibly all this should be shared among ALL employees and only their list of actions
	// changes when a job is assigned...
	if (!emp.currentAction) {
		emp.currentAction = gathererActions[0].action;
	}

	const { prelifeMap: map, research } = worldState;

	const action = gathererActions.find((a) => a.action === emp.currentAction);
	if (!action) return;

	switch (action.action) {
		case gathererActionTypes.Gathering:
			const currentWorkSpeed =
				action.getSpeed(attributes, research) *
				attributes.overallWorkFactor *
				delta_sec;

			emp.currentWorkSpeed = currentWorkSpeed;
			emp.currentJobProgress += currentWorkSpeed;

			emp.secsSinceCompleted += delta_sec;

			break;
		case gathererActionTypes.Travelling:
			emp.currentJobProgress = 0;
			emp.secsSinceCompleted += delta_sec;
			handleTravelling(emp, action, map, worldState);
			break;
		case gathererActionTypes.Returning:
			emp.currentJobProgress = 0;
			emp.secsSinceCompleted += delta_sec;
			handleReturning(emp, action, map, worldState);
			break;
		default:
			console.log(`unknown gatherer action: ${action.action}`);
			break;
	}

	let completed = 0;
	while (emp.currentJobProgress >= 100) {
		completed++;
		emp.currentJobProgress -= 100;
	}

	if (completed > 0) {
		handleCompletions(completed, emp, action, inventory, worldState);
	}
}

function handleCompletions(
	completedAmount: number,
	emp: Employee,
	action: IAction,
	inventory: Inventory,
	worldState: WorldState
): void {
	// TK: gatherers need to gather more
	const amountGathered = completedAmount;
	const gatheredLevel = emp.currentTile.resources;

	if (gatheredLevel < 0 || gatheredLevel > rarities.maxLevel) {
		throw new Error(`Gathered impossible resource: ${gatheredLevel}`);
	}

	// TK add experience here
	// TK this should move to carrying, and then be dumped into the inventory on Return below
	inventory.changeIngredientAmount(gatheredLevel, amountGathered);
	emp.secsSinceCompleted = 0;
	emp.completedMessage = `+${completedAmount}`; // `+${gathered} basic ingredient${

	emp.currentJobProgress = 0;
	emp.setDestinationTile(undefined);
	emp.currentAction = action.nextAction;
}

function handleTravelling(
	emp: Employee,
	action: IAction,
	map: PrelifeMap,
	worldState: WorldState
): void {
	const { playerAttributes: attributes } = worldState;

	if (emp.destinationTile && !emp.currentTile.is(emp.destinationTile)) {
		// still travelling, no need to update
		return;
	}

	// choose best rarity that has been a) unlocked and b) discovered
	const highestUnlocked = Math.min(
		attributes.getRarityLevel(worldState.research),
		rarities.maxLevel
	);

	const discovered = map.getDiscoveredResources();

	let rarity = 0;
	discovered.forEach((level) => {
		if (level > rarity && level <= highestUnlocked) {
			rarity = level;
		}
	});

	const resourceTile = map.getResourceTile(rarity);

	if (emp.currentTile.is(resourceTile)) {
		// arrived
		emp.setDestinationTile(undefined);
		emp.currentAction = action.nextAction;
		return;
	}

	if (!emp.destinationTile || emp.currentTile.is(emp.destinationTile)) {
		const nextTile = map.getNextTileBetween(emp.currentTile, resourceTile);

		if (nextTile) {
			emp.setDestinationTile(nextTile);
		}
	}
}

function handleReturning(
	emp: Employee,
	action: IAction,
	map: PrelifeMap,
	worldState: WorldState
): void {
	if (emp.destinationTile && !emp.currentTile.is(emp.destinationTile)) {
		// still travelling, no need to update
		return;
	}

	const homeTile = map.getComplexTile();

	if (emp.currentTile.is(homeTile)) {
		// arrived
		emp.setDestinationTile(undefined);
		emp.currentAction = action.nextAction;
		return;
	}

	if (!emp.destinationTile || emp.currentTile.is(emp.destinationTile)) {
		const nextTile = map.getNextTileBetween(emp.currentTile, homeTile);

		if (nextTile) {
			emp.setDestinationTile(nextTile);
		}
	}
}
