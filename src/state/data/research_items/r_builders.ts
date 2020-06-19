import { IResearchItem } from "./../../research/IResearchItem";
import ResearchIds from "./r_ids";
import WorldState from "../../world_state";
import { JobTypes } from "../../jobs/job_types";
const r_builders: IResearchItem = {
	research_id: ResearchIds.Building,
	unlocked: false,
	children: [],
	name: "Building",
	description: "Construction will help you grow.",
	cost: 500,
	progressPercent: 0,
	researchDifficulty: 1,
	prerequisitesMet(worldState: WorldState): boolean {
		// const { research } = worldState;
		return this.unlocked && true;
	},
	completed: false,
	onComplete(worldState: WorldState): void {
		worldState.employees.unlockedJobs.push(JobTypes.Building);
		this.children.forEach((c) => (c.unlocked = true));
	},
	getValue(): number {
		return 0;
	},
};

export default r_builders;
