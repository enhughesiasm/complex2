import { JobTypes } from "./../../jobs/job_types";
import WorldState from "../../world_state";
import Employee from "../../employees/employee";
import PlayerAttributes from "../../player_attributes";
import IAction from "./IAction";
import Research from "../../research/research";

const builderActionTypes = {
	Idle: "Idle",
	Building: "Building",
};

const builderActions: Array<IAction> = [
	{
		action: builderActionTypes.Idle,
		nextAction: builderActionTypes.Building,
		getSpeed(attributes: PlayerAttributes, research: Research) {
			return 0;
		},
	},
	{
		action: builderActionTypes.Building,
		nextAction: builderActionTypes.Idle,
		getSpeed(attributes: PlayerAttributes, research: Research) {
			return attributes.e_build_base_speed;
		},
	},
];

export const builders_tick = {
	enabled: true,
	id: "BUILDERS_TICK",
	priority: 26,

	run(worldState: WorldState, delta_sec: number) {
		const { employees, playerAttributes: attributes } = worldState;

		const builders = employees.all.filter(
			(a) => a.assignedJob === JobTypes.Building
		);

		if (builders.length === 0) return;

		builders.forEach((g) => tickBuilder(g, attributes, worldState, delta_sec));
	},
};

function tickBuilder(
	emp: Employee,
	attributes: PlayerAttributes,
	worldState: WorldState,
	delta_sec: number
) {
	const { research } = worldState;

	if (!emp.currentAction) {
		emp.currentAction = builderActions[0].action;
	}

	const action = builderActions.find((a) => a.action === emp.currentAction);
	if (!action) return;

	switch (action.action) {
		case builderActionTypes.Idle:
			if (research.currentId !== undefined) {
				emp.currentAction = action.nextAction;
				emp.currentJobProgress = 0;
				emp.secsSinceCompleted = 0;
			}
			break;
		case builderActionTypes.Building:
			break;
		default:
			console.log(`unknown builder action: ${action.action}`);
			break;
	}

	let completed = 0;
	while (emp.currentJobProgress >= 100) {
		completed++;
		emp.currentJobProgress -= 100;
	}

	if (completed > 0) {
		completeBuilding(completed, emp, action, worldState);
	}
}

function completeBuilding(
	completedAmount: number,
	emp: Employee,
	action: IAction,
	worldState: WorldState
): void {
	emp.secsSinceCompleted = 0;
	emp.completedMessage = `built something`;
	emp.currentJobProgress = 0;

	emp.currentAction = action.nextAction;
}
