import { ITraitGenerator } from "./traits/ITraitGenerator";
import { ingredientLevel } from "./data/ingredient_levels";
import GameState from "./game_state";
import produce from "immer";
import Flags from "./world_flags";
import WorldOperations from "./world_operations";
import PlayerAttributes from "./player_attributes";
import Inventory from "./inventory/inventory";
import TraitStorage from "./trait_storage/trait_storage";
import generateTrait from "./traits/generator/generate_trait";
import IWorldState from "./IWorldState";

let isTicking = false;

export function tick_game(delta_sec: number, gameState: GameState): GameState {
	if (isTicking) {
		alert("double tick"); // TK TODO remove this
	}

	const nextState = produce(gameState, (newGameState) => {
		isTicking = true;
		const { worldState } = gameState;
		const {
			inventory,
			worldFlags: flags,
			worldOperations: operations,
			playerAttributes,
			storage,
			traitGenerator,
		} = worldState;

		// TK: pay workers first, then all workers operate by multiplied amounts accordingly

		// TK gather progress / ALL progresses?? think on this!
		progress(delta_sec, flags, operations, playerAttributes);

		// gather results
		results(
			delta_sec,
			flags,
			operations,
			playerAttributes,
			inventory,
			storage,
			traitGenerator,
			worldState
		);

		// deliveries

		// manufacture

		// exploration

		// construction

		isTicking = false;
	});

	return nextState;
}

// TK: this probably can be refactored way more cleverly but for now let's just get it up and running...

function progress(
	delta_sec: number,
	flags: Flags,
	operations: WorldOperations,
	attributes: PlayerAttributes
): void {
	// manual ingredient gathering progress
	if (flags.isGatheringBasicIngredients) {
		operations.gatherBasicIngredientsProgress +=
			attributes.gatherBasicIngredientsPerSecond * delta_sec;
		operations.gatherBasicIngredientsProgress =
			Math.round(operations.gatherBasicIngredientsProgress * 1e3) / 1e3;
	}

	// help from curious passers by with basic gathering
	if (flags.manualGatherHelpCycles > 0) {
		operations.gatherBasicIngredientsProgress +=
			attributes.gatherBasicIngredientsPerSecond * delta_sec;
		operations.gatherBasicIngredientsProgress =
			Math.round(operations.gatherBasicIngredientsProgress * 1e3) / 1e3;
	}

	// manual mixing process
	if (flags.isHandMixingIngredients) {
		operations.handMixIngredientsProgress +=
			attributes.mixIngredientsPerSecond * delta_sec;
		operations.handMixIngredientsProgress =
			Math.round(operations.handMixIngredientsProgress * 1e3) / 1e3;
	}

	// manual delivery process
	if (flags.isHandDeliveringBatch) {
		operations.handDeliverBatchProgress +=
			attributes.handDeliveryProgressPerSecond * delta_sec;
		operations.handDeliverBatchProgress =
			Math.round(operations.handDeliverBatchProgress * 1e3) / 1e3;
	}
}

function results(
	delta_sec: number,
	flags: Flags,
	operations: WorldOperations,
	attributes: PlayerAttributes,
	inventory: Inventory,
	storage: TraitStorage,
	traitGenerator: ITraitGenerator,
	worldState: IWorldState
): void {
	// manual ingredient results
	const currentBasics = inventory.getIngredientAmount(ingredientLevel.Basic);

	let gathered = 0;
	while (operations.gatherBasicIngredientsProgress >= 100) {
		gathered++;
		operations.gatherBasicIngredientsProgress -= 100;
		flags.isGatheringBasicIngredients = false;
	}

	if (gathered > 0) {
		operations.gatherBasicIngredientsProgress = 0;

		if (flags.manualGatherHelpCycles > 0) {
			flags.manualGatherHelpCycles -= gathered;
			flags.manualGatherHelpCycles = Math.max(0, flags.manualGatherHelpCycles);
		}
		inventory.setIngredientAmount(
			ingredientLevel.Basic,
			currentBasics + gathered
		);
	}

	// manual mixing results
	let mixed = 0;
	while (operations.handMixIngredientsProgress >= 100) {
		mixed++;
		operations.handMixIngredientsProgress -= 100;
		flags.isHandMixingIngredients = false;
	}

	if (mixed > 0) {
		operations.handMixIngredientsProgress = 0;
		for (let i = 0; i < mixed; i++) {
			storage.addHandTrait(generateTrait(traitGenerator));
			worldState.totalTraitsProduced++;
		}
	}

	// hand deliver batch

	while (operations.handDeliverBatchProgress >= 100) {
		// on completion, we deliver everything in the handtraits, which should be a limited storage
		const traits = storage.handTraits;
		traits.forEach((t) => {
			worldState.shop.receiveTraitsAtLevelNumber(t.rarity, 1);
			worldState.favours += worldState.shop.getTraitPayment(t.rarity, 1);
		});
		worldState.storage.handTraits = [];
		flags.isHandDeliveringBatch = false;
		operations.handDeliverBatchProgress = 0;
		flags.handDeliveredFirstBatch = true;
	}
}
