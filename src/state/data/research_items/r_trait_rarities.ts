import { maxRarityFactor } from "./../../constants";
import { IResearchItem } from "./../../research/IResearchItem";
import ResearchIds from "./r_ids";
import WorldState from "../../world_state";

const r_rarities: Array<IResearchItem> = [];

for (let i = 0; i < maxRarityFactor; i++) {
	r_rarities.push({
		research_id: ResearchIds.TraitRarityPrefix + i,
		children: [],
		unlocked: false,
		name: "Improve Trait Rarity",
		description: "Create rarer traits.",
		cost: Math.pow(10, i + 1),
		progressPercent: 0,
		researchDifficulty: i,
		prerequisitesMet(worldState: WorldState): boolean {
			// const { research } = worldState;
			return this.unlocked && true;
		},
		completed: false,
		onComplete(worldState: WorldState): void {
			// worldState.playerAttributes.unlockedRarityLevel += 1;
			// worldState.playerAttributes.unlockedRarityLevel = Math.min(
			// 	worldState.playerAttributes.unlockedRarityLevel,
			// 	maxRarityFactor
			// );

			// if (worldState.playerAttributes.unlockedRarityLevel === maxRarityFactor) {
			// 	this.progressPercent = 100;
			// } else {
			// 	this.progressPercent = 0;
			// 	this.researchDifficulty += 1;
			// }
			this.children.forEach((c) => (c.unlocked = true));
		},
		getValue(): number {
			return 1;
		},
	});

	if (i > 0) {
		r_rarities[i - 1].children.push(r_rarities[i]);
	}
}

export default r_rarities;
