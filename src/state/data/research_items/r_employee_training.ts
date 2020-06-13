import { r_carry_capacity } from "./r_carry_capacity";
import { IResearchItem } from "./../../research/IResearchItem";
import ResearchIds from "./r_ids";
import WorldState from "../../world_state";

export const r_employee_training: IResearchItem = {
	research_id: ResearchIds.EmployeeTraining,
	children: [r_carry_capacity],
	unlocked: false,
	name: "Employee Training",
	description: "Speed up basic tasks and unlock future trainings.",
	progressPercent: 0,
	researchDifficulty: 1,
	prerequisitesMet(worldState: WorldState): boolean {
		// const { research } = worldState;
		return this.unlocked && true;
	},
	completeClaimed: false,
	onComplete(worldState: WorldState): void {
		worldState.playerAttributes.deliveryCarryCapacity += 5;
		this.children.forEach((c) => (c.unlocked = true));
	},
};
