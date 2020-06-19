import { IResearchItem } from "./../../research/IResearchItem";
import ResearchIds from "./r_ids";
import WorldState from "../../world_state";

export const r_carry_capacity: IResearchItem = {
	research_id: ResearchIds.Backpack,
	name: "A Backpack",
	description: "Will help your delivery people carry more traits.",
	cost: 200,
	children: [],
	unlocked: false,
	progressPercent: 0,
	researchDifficulty: 1,
	prerequisitesMet(worldState: WorldState): boolean {
		// const { research } = worldState;
		return this.unlocked && true;
	},
	completed: false,
	onComplete(worldState: WorldState): void {
		// worldState.playerAttributes.deliveryCarryCapacity += 5;
	},
	getValue(): number {
		return this.progressPercent >= 100 ? 25 : 0; // additional carry capacity
	},
};
