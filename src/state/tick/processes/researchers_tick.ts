import { JobTypes } from "./../../jobs/job_types";
import WorldState from "../../world_state";
import Employee from "../../employees/employee";
import PlayerAttributes from "../../player_attributes";
import IAction from "./IAction";
import Research from "../../research/research";

const researcherActionTypes = {
	Idle: "Idle",
	Researching: "Researching",
};

const researcherActions: Array<IAction> = [
	{
		action: researcherActionTypes.Idle,
		nextAction: researcherActionTypes.Researching,
		getSpeed(attributes: PlayerAttributes) {
			return 0;
		},
	},
	{
		action: researcherActionTypes.Researching,
		nextAction: researcherActionTypes.Idle,
		getSpeed(attributes: PlayerAttributes) {
			return attributes.e_research_baseSpeed;
		},
	},
];

export const researchers_tick = {
	enabled: true,
	id: "RESEARCHERS_TICK",
	priority: 25,

	run(worldState: WorldState, delta_sec: number) {
		const { employees, playerAttributes: attributes } = worldState;

		const researchers = employees.all.filter(
			(a) => a.assignedJob === JobTypes.Researching
		);

		if (researchers.length === 0) return;

		researchers.forEach((g) =>
			tickResearcher(g, attributes, worldState, delta_sec)
		);
	},
};

function tickResearcher(
	emp: Employee,
	attributes: PlayerAttributes,
	worldState: WorldState,
	delta_sec: number
) {
	const { research } = worldState;

	if (!emp.currentAction) {
		emp.currentAction = researcherActions[0].action;
	}

	const action = researcherActions.find((a) => a.action === emp.currentAction);
	if (!action) return;

	switch (action.action) {
		case researcherActionTypes.Idle:
			if (research.currentId !== undefined) {
				emp.currentAction = action.nextAction;
				emp.currentJobProgress = 0;
				emp.secsSinceCompleted = 0;
			}
			break;
		case researcherActionTypes.Researching:
			if (!research.currentId) {
				emp.currentAction = action.nextAction;
				emp.currentJobProgress = 0;
				return;
			}

			const current = research.getItem(research.currentId);

			const difficulty =
				(current.researchDifficulty + 1) * (current.researchDifficulty + 1);

			const researchProgress =
				(action.getSpeed(attributes) *
					attributes.overallWorkFactor *
					delta_sec) /
				difficulty;

			current.progressPercent += researchProgress;
			emp.secsSinceCompleted += delta_sec;
			emp.currentJobProgress = current.progressPercent;

			break;
		default:
			console.log(`unknown researcher action: ${action.action}`);
			break;
	}

	let completed = 0;
	while (emp.currentJobProgress >= 100) {
		completed++;
		emp.currentJobProgress -= 100;
	}

	if (completed > 0) {
		completeResearch(completed, emp, action, research, worldState);
	}
}

function completeResearch(
	completedAmount: number,
	emp: Employee,
	action: IAction,
	research: Research,
	worldState: WorldState
): void {
	if (!research.currentId) return;

	const current = research.getItem(research.currentId);

	if (current.progressPercent >= 100 && !current.completeClaimed) {
		research.completeCurrentResearch(worldState);
	}

	emp.secsSinceCompleted = 0;
	emp.completedMessage = `discovered ${current.name}`;
	emp.currentJobProgress = 0;

	emp.currentAction = action.nextAction;
}
