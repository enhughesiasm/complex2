import GameState from "../game_state";
import UIState from "../ui_state";
import produce from "immer";
import { fillTraitsSummary } from "./ui/fill_traits_summary";

export function tick_ui(
	delta_sec: number,
	gameState: GameState,
	uiState: UIState
): UIState {
	const nextState = produce(uiState, (newUiState) => {
		const { worldState } = gameState;

		fillTraitsSummary(delta_sec, uiState, worldState, gameState);
	});

	return nextState;
}
