import { StatNames } from "./../../history/stat_names";
import {
	visual_traits_maxAmount,
	visual_traits_scroll_max_seconds,
} from "./../../constants";
import UIState from "../../ui_state";
import WorldState from "../../world_state";
import GameState from "../../game_state";

export function fillTraitsSummary(
	delta_sec: number,
	uiState: UIState,
	worldState: WorldState,
	gameState: GameState
) {
	const { storage } = worldState;
	const { history } = gameState;

	uiState.traitsSummaryAccumulatedSeconds += delta_sec;

	const totalStored = storage.getTotalStored();

	const toShow = Math.min(visual_traits_maxAmount, totalStored);

	if (uiState.traitsSummaryTraits.length > totalStored) {
		const toRemove = uiState.traitsSummaryTraits.length - totalStored;
		uiState.traitsSummaryTraits.splice(0, toRemove);
	}

	if (uiState.traitsSummaryTraits.length > toShow) {
		const toRemove = uiState.traitsSummaryTraits.length - toShow;
		uiState.traitsSummaryTraits.splice(0, toRemove);
	}

	if (
		totalStored > uiState.traitsSummaryTraits.length &&
		history.get(StatNames.DeliveryPerS) > 0 &&
		worldState.employees.getTotalCarriedByDeliverers() > 0 &&
		uiState.traitsSummaryAccumulatedSeconds > visual_traits_scroll_max_seconds
	) {
		uiState.traitsSummaryTraits.splice(0, 1);
		uiState.traitsSummaryAccumulatedSeconds = 0;
	}

	const missing = toShow - uiState.traitsSummaryTraits.length;

	if (missing > 0) {
		const traitsToPush = storage.peekRarestFirst(missing);

		traitsToPush
			.getIterator()
			.where((a) => a.amount > 0)
			.forEach((t) => {
				for (let i = 0; i < t.amount; i++) {
					uiState.traitsSummaryTraits.push(
						worldState.traitGenerator.generateSingleAtSpecificLevel(
							t.level,
							worldState.playerAttributes
						)
					);
				}
			});
	}
}
