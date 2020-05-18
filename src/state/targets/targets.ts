import WorldState from "../world_state";
import { LetterTypes } from "../letters/letters";

export interface ITarget {
	name: string;
	description: string;
	completed: boolean;
	distanceFromCompletion(worldState: WorldState): number;
	progressTowardsCompletion(worldState: WorldState): number;
	targetValue: number;
	targetUnits: string;
	onCompletion(worldState: WorldState): void;
	claimed: boolean;
	claim(worldState: WorldState): void;
}

// TK: each of these can be defined in their own file
export const targets: Array<ITarget> = [
	{
		name: "An Enticement",
		description:
			"The Shopkeeper mentioned she had an idea for you. But she probably wants some more traits first...",
		completed: false,
		targetValue: 10, // total traits received
		targetUnits: "traits delivered to the Shop",
		distanceFromCompletion(worldState: WorldState) {
			return this.targetValue - worldState.shop.totalReceived;
		},
		progressTowardsCompletion(worldState: WorldState) {
			return worldState.shop.totalReceived;
		},
		onCompletion(worldState: WorldState) {
			this.completed = true;
		},
		claimed: false,
		claim(worldState: WorldState) {
			worldState.letterManager.sendLetter(LetterTypes.UnlockEmployees);
			this.claimed = true;
		},
	},
];
