import { JobTypes } from "./../../jobs/job_types";
import WorldState from "../../world_state";
import Employee from "../../employees/employee";
import PlayerAttributes from "../../player_attributes";
import Inventory from "../../inventory/inventory";
import IAction from "./IAction";
import PrelifeMap from "../../prelife_map/prelife_map";

const explorerActionTypes = {
	Travelling: "Travelling",
	Exploring: "Exploring",
	Finished: "Finished",
};

const explorerActions: Array<IAction> = [
	{
		action: explorerActionTypes.Travelling,
		nextAction: explorerActionTypes.Exploring,
		getSpeed(attributes: PlayerAttributes) {
			// TK yeah this is stupid but it's less stupid than how I previously did it... refactor later!
			console.error(
				"bug elsewhere! shouldn't be calling getSpeed for a travelling job"
			);
			return 0;
		},
	},
	{
		action: explorerActionTypes.Exploring,
		nextAction: explorerActionTypes.Travelling,
		getSpeed(attributes: PlayerAttributes) {
			return attributes.e_explore_baseSpeed;
		},
	},
	{
		action: explorerActionTypes.Finished,
		nextAction: explorerActionTypes.Finished,
		getSpeed(attributes: PlayerAttributes) {
			return 0;
		},
	},
];

export const explorers_tick = {
	enabled: true,
	id: "EXPLORERS_TICK",
	priority: 24,

	run(worldState: WorldState, delta_sec: number) {
		const { employees, playerAttributes: attributes, inventory } = worldState;

		const explorers = employees.all.filter(
			(a) => a.assignedJob === JobTypes.Exploring
		);

		if (explorers.length === 0) return;

		explorers.forEach((g) =>
			tickExplorer(g, attributes, inventory, worldState, delta_sec)
		);
	},
};

function tickExplorer(
	emp: Employee,
	attributes: PlayerAttributes,
	inventory: Inventory,
	worldState: WorldState,
	delta_sec: number
) {
	if (!emp.currentAction) {
		emp.currentAction = explorerActions[0].action;
	}

	const { prelifeMap: map } = worldState;

	const action = explorerActions.find((a) => a.action === emp.currentAction);
	if (!action) return;

	switch (action.action) {
		case explorerActionTypes.Exploring:
			const currentWorkSpeed =
				action.getSpeed(attributes) * attributes.overallWorkFactor * delta_sec;

			emp.currentWorkSpeed = currentWorkSpeed;
			emp.currentTile.explorationCompletion += currentWorkSpeed;
			emp.currentJobProgress = emp.currentTile.explorationCompletion;

			emp.secsSinceCompleted += delta_sec;

			break;
		case explorerActionTypes.Travelling:
			handleTravelling(emp, action, map, worldState);
			break;
		case explorerActionTypes.Finished:
			if (emp.currentTile.is(map.getComplexTile())) {
				emp.destinationTile = undefined;
				return;
			}
			returnHome(emp, map);
			return;
		default:
			console.error(`Unknown explorer action: ${action.action}`);
			break;
	}

	let completed = 0;
	while (emp.currentJobProgress >= 100) {
		completed++;
		emp.currentJobProgress -= 100;
	}

	if (completed > 0) {
		handleCompletions(completed, emp, action, map, worldState);
	}
}

function handleCompletions(
	completions: number,
	emp: Employee,
	action: IAction,
	map: PrelifeMap,
	worldState: WorldState
) {
	emp.currentTile.explored = true;
	emp.currentTile.explorationCompletion = 100;
	emp.secsSinceCompleted = 0;
	emp.completedMessage = `discovery!`; // `+${gathered} basic ingredient${

	emp.currentJobProgress = 0;
	emp.setDestinationTile(undefined);
	emp.currentAction = action.nextAction;
}

function returnHome(emp: Employee, map: PrelifeMap) {
	if (emp.destinationTile && !emp.currentTile.is(emp.destinationTile)) {
		// still travelling, no need to update
		return;
	}

	const complexTile = map.getComplexTile();

	if (emp.currentTile.is(complexTile)) {
		emp.setDestinationTile(undefined);
		emp.currentAction = explorerActionTypes.Finished;
		return;
	}

	if (!emp.destinationTile || emp.currentTile.is(emp.destinationTile)) {
		const nextTile = map.getNextTileBetween(emp.currentTile, complexTile);

		if (nextTile) {
			emp.setDestinationTile(nextTile);
		}
	}
}

function handleTravelling(
	emp: Employee,
	action: IAction,
	map: PrelifeMap,
	worldState: WorldState
) {
	if (emp.destinationTile && !emp.currentTile.is(emp.destinationTile)) {
		// still travelling, no need to update
		return;
	}

	// choose nearest tile to explore
	const unknownTile = map.getNearestUnexploredTile(map.getComplexTile());

	if (unknownTile !== undefined) {
		if (emp.currentTile.is(unknownTile)) {
			emp.setDestinationTile(undefined);
			emp.currentAction = action.nextAction;
			return;
		}

		if (!emp.destinationTile || emp.currentTile.is(emp.destinationTile)) {
			const nextTile = map.getNextTileBetween(emp.currentTile, unknownTile);

			if (nextTile) {
				emp.setDestinationTile(nextTile);
			}
		}
	} else {
		// out of tiles
		emp.currentAction = explorerActionTypes.Finished;
	}
}
