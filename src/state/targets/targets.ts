import { JobTypes } from "./../jobs/job_types";
import moment from "moment";
import WorldState from "../world_state";
import { LetterTypes } from "../letters/letters";
import { ensure } from "../../components/shared/functions";
import { targetIDs } from "./target_ids";

export interface ITarget {
	id: string;
	name: string;
	description: string;
	visible: boolean;
	completed: boolean;
	timeCompleted?: number;
	distanceFromCompletion(worldState: WorldState): number;
	progressTowardsCompletion(worldState: WorldState): number;
	targetValue: number;
	targetUnits: string;
	onCompletion(worldState: WorldState): void;
	claimed: boolean;
	claimedMessage: string;
	claim(worldState: WorldState): void;
}

// TK: each of these can be defined in their own file
export const targets: Array<ITarget> = [
	{
		id: targetIDs.UnlockEmployees,
		name: "An Enticement",
		visible: true,
		description:
			"The Shopkeeper mentioned she had an idea for you. But she probably wants some more traits first...",
		completed: false,
		targetValue: 100,
		targetUnits: "traits delivered to the Shop",
		distanceFromCompletion(worldState: WorldState) {
			return this.targetValue - worldState.shop.totalReceived();
		},
		progressTowardsCompletion(worldState: WorldState) {
			return worldState.shop.totalReceived();
		},
		onCompletion(worldState: WorldState) {
			this.completed = true;
			this.timeCompleted = moment().unix(); // seconds since epoch
		},
		claimed: false,
		claimedMessage: "Letter sent.",
		claim(worldState: WorldState) {
			worldState.letterManager.sendLetter(LetterTypes.UnlockEmployees);
			this.claimed = true;
			ensure(
				targets.find((a) => a.id === targetIDs.UnlockNewJobs)
			).visible = true;
		},
	},
	{
		id: targetIDs.UnlockNewJobs,
		name: "A New Start",
		visible: false,
		description: "Get a regular supply of ingredients.",
		completed: false,
		targetValue: 3,
		targetUnits: "employees hired",
		distanceFromCompletion(worldState: WorldState) {
			return this.targetValue - worldState.employees.all.length;
		},
		progressTowardsCompletion(worldState: WorldState) {
			return worldState.employees.all.length;
		},
		onCompletion(worldState: WorldState) {
			this.completed = true;
		},
		claimed: false,
		claimedMessage: "New jobs unlocked.",
		claim(worldState: WorldState) {
			worldState.employees.unlockedJobs.push(
				JobTypes.Mixing,
				JobTypes.Delivering
			);
			this.claimed = true;
		},
	},
];
