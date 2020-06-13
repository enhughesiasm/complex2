import WorldState from "../world_state";

export interface IResearchItem {
	research_id: string;
	name: string;
	description: string;
	unlocked: boolean;
	prerequisitesMet(worldState: WorldState): boolean;
	progressPercent: number;
	researchDifficulty: number;
	completeClaimed: boolean;
	onComplete(worldState: WorldState): void;
	children: Array<IResearchItem>;
}
