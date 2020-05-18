import GameState from "../game_state";
import produce from "immer";
import WorldState from "../world_state";

let isTicking = false;

export function tick_game(delta_sec: number, gameState: GameState): GameState {
	if (isTicking) {
		console.error("ERROR: repeat tick");
	}

	if (gameState.worldState.debug) {
		delta_sec *= 5;
	}

	try {
		const nextState = produce(gameState, (newGameState) => {
			isTicking = true;
			const { worldState } = newGameState;

			const { processList: tickProcesses } = worldState;

			tickProcesses
				.filter((a) => a.enabled)
				.sort((a, b) => (a.priority > b.priority ? 1 : -1)) // lower priority first
				.forEach((p) => p.run(worldState, delta_sec));

			worldState.targets
				.filter((g) => !g.completed)
				.forEach((g) => {
					if (g.distanceFromCompletion(worldState) <= 0) {
						g.onCompletion(worldState);
					}
				});

			isTicking = false;
		});
		return nextState;
	} catch (e) {
		console.error("Uh-oh, couldn't calculate the next tick.", e);
	}

	return gameState; // if we got here, just return the old state
}
