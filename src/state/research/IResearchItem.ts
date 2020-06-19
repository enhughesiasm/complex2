import WorldState from "../world_state";

export interface IResearchItem {
	research_id: string;
	name: string;
	description: string;
	cost: number;
	costRemaining?: number;
	unlocked: boolean;
	prerequisitesMet(worldState: WorldState): boolean;
	progressPercent: number;
	researchDifficulty: number;
	completed: boolean;
	children: Array<IResearchItem>;

	onComplete(worldState: WorldState): void;
	getValue(): number;
}
