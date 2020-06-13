import { IResearchItem } from "./../../research/IResearchItem";
import ResearchIds from "./r_ids";
import WorldState from "../../world_state";
import { JobTypes } from "../../jobs/job_types";
const r_exploration: IResearchItem = {
	research_id: ResearchIds.Exploration,
	unlocked: false,
	children: [],
	name: "Explore",
	description: "Explore the world map",
	progressPercent: 0,
	researchDifficulty: 1,
	prerequisitesMet(worldState: WorldState): boolean {
		// const { research } = worldState;
		return this.unlocked && true;
	},
	completeClaimed: false,
	onComplete(worldState: WorldState): void {
		worldState.employees.unlockedJobs.push(JobTypes.Exploring);
		this.children.forEach((c) => (c.unlocked = true));
	},
};

export default r_exploration;
