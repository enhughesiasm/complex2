import { IResearchItem } from "./../../research/IResearchItem";
import ResearchIds from "./r_ids";
import WorldState from "../../world_state";

export const r_carry_capacity: IResearchItem = {
	research_id: ResearchIds.CarryCapacity,
	name: "Carry more stuff",
	description: "Carry more traits.",
	children: [],
	unlocked: false,
	progressPercent: 0,
	researchDifficulty: 1,
	prerequisitesMet(worldState: WorldState): boolean {
		// const { research } = worldState;
		return this.unlocked && true;
	},
	completeClaimed: false,
	onComplete(worldState: WorldState): void {
		worldState.playerAttributes.deliveryCarryCapacity += 5;
	},
};
