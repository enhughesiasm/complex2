import { r_employee_training } from "./r_employee_training";
import { IResearchItem } from "./../../research/IResearchItem";
import ResearchIds from "./r_ids";
import WorldState from "../../world_state";

import r_rarities from "./r_trait_rarities";
import r_exploration from "./r_exploration";
import r_builders from "./r_builders";

export const r_researchers: IResearchItem = {
	research_id: ResearchIds.Researchers,
	name: "Discover Research Itself",
	description: "What even is science?",
	children: [r_employee_training, r_rarities[0], r_exploration, r_builders],
	cost: 10,
	unlocked: true,
	progressPercent: 0,
	researchDifficulty: 0,
	prerequisitesMet(worldState: WorldState): boolean {
		// const { research } = worldState;
		return this.unlocked && true;
	},
	completed: false,
	onComplete(worldState: WorldState): void {
		this.children.forEach((c) => (c.unlocked = true));
	},
	getValue(): number {
		return 0;
	},
};
