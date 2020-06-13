import { maxRarityFactor } from "./../../constants";
import { IResearchItem } from "./../../research/IResearchItem";
import ResearchIds from "./r_ids";
import WorldState from "../../world_state";

export const r_trait_rarity: IResearchItem = {
	research_id: ResearchIds.TraitRarity,
	children: [],
	unlocked: false,
	name: "Improve Trait Rarity",
	description: "Create rarer traits.",
	progressPercent: 0,
	researchDifficulty: 1,
	prerequisitesMet(worldState: WorldState): boolean {
		// const { research } = worldState;
		return this.unlocked && true;
	},
	completeClaimed: false,
	onComplete(worldState: WorldState): void {
		worldState.playerAttributes.unlockedRarityLevel += 1;
		worldState.playerAttributes.unlockedRarityLevel = Math.min(
			worldState.playerAttributes.unlockedRarityLevel,
			maxRarityFactor
		);

		if (worldState.playerAttributes.unlockedRarityLevel === maxRarityFactor) {
			this.progressPercent = 100;
		} else {
			this.progressPercent = 0;
			this.researchDifficulty += 1;
		}
		this.children.forEach((c) => (c.unlocked = true));
	},
};
