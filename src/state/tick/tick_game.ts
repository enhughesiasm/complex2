import moment from "moment";
import GameState from "../game_state";
import produce from "immer";

let isTicking = false;

export function tick_game(delta_sec: number, gameState: GameState): GameState {
	if (isTicking) {
		console.error("ERROR: repeat tick");
	}

	if (gameState.worldState.paused) {
		return gameState;
	}

	if (gameState.worldState.debug) {
		// TK remove this
		gameState.worldState.playerAttributes.overallWorkFactor = 2;
	}

	try {
		const nextState = produce(gameState, (newGameState) => {
			isTicking = true;
			const { worldState } = newGameState;

			worldState.now = moment();

			const { processList: tickProcesses } = worldState;

			// run each process
			tickProcesses
				.filter((a) => a.enabled)
				.sort((a, b) => (a.priority > b.priority ? 1 : -1)) // lower priority first
				.forEach((p) => p.run(worldState, delta_sec));

			// check for target completion
			worldState.targets
				.filter((g) => !g.completed)
				.forEach((g) => {
					if (g.distanceFromCompletion(worldState) <= 0) {
						g.onCompletion(worldState);
					}
				});

			// update map data
			worldState.prelifeMap.update(worldState);
		});

		// // update render map
		// gameState.renderMap.update(gameState.worldState.prelifeMap);

		// lastly update the history
		gameState.history.update(gameState.worldState, delta_sec);

		isTicking = false;

		return nextState;
	} catch (e) {
		console.error("Uh-oh, couldn't calculate the next tick.", e);
	}

	return gameState; // if we got here, just return the old state
}
