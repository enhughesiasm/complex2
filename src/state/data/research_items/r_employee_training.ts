import { r_carry_capacity } from "./r_carry_capacity";
import { IResearchItem } from "./../../research/IResearchItem";
import ResearchIds from "./r_ids";
import WorldState from "../../world_state";

export const r_employee_training: IResearchItem = {
	research_id: ResearchIds.BasicEmployeeTraining,
	children: [r_carry_capacity],
	unlocked: false,
	name: "Basic Employee Training",
	cost: 100,
	description: "Speed up simple tasks.",
	progressPercent: 0,
	researchDifficulty: 1,
	prerequisitesMet(worldState: WorldState): boolean {
		// const { research } = worldState;
		return this.unlocked && true;
	},
	completed: false,
	onComplete(worldState: WorldState): void {
		this.children.forEach((c) => (c.unlocked = true));
	},
	getValue(): number {
		return 1.5;
	},
};
