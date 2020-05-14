import WorldState from "../../world_state";
import GameState from "../../game_state";

export interface IGoal {
	name: string;
	description: string;
	completed: boolean;
	distanceFromCompletion(worldState: WorldState): number;
	progressTowardsCompletion(worldState: WorldState): number;
	goalValue: number;
	onCompletion(worldState: WorldState): void;
}

export const goals: Array<IGoal> = [
	{
		name: "An Enticement",
		description:
			"The Shopkeeper mentioned she had an idea for you. But she probably wants some more traits first...",
		completed: false,
		goalValue: 10, // total traits received
		distanceFromCompletion(worldState: WorldState) {
			return this.goalValue - worldState.shop.totalReceived;
		},
		progressTowardsCompletion(worldState: WorldState) {
			return worldState.shop.totalReceived;
		},
		onCompletion(worldState: WorldState) {
			alert("woo");
			this.completed = true;
		},
	},
];
