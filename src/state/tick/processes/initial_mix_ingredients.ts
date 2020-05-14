import {
	ingredientLevel,
	ingredientLevelStrings,
} from "./../../data/ingredient_levels";
import { toast } from "react-toastify";
import WorldState from "../../world_state";

export const initialMixIngredients_progress = {
	enabled: true,

	priority: 10,

	run(worldState: WorldState, delta_sec: number) {
		const {
			worldFlags: flags,
			worldOperations: operations,
			playerAttributes: attributes,
			inventory,
		} = worldState;

		// begin process if necessary
		if (
			!flags.isHandMixingIngredients &&
			flags.initialProductionHelpCycles <= 0
		) {
			// no mixing is occurring
			return;
		}

		if (operations.handMixIngredientsProgress === 0) {
			// need to start, so we need ingredients
			if (inventory.getIngredientAmount(ingredientLevel.Basic) <= 0) {
				// can't mix
				return;
			}

			// can mix, use up ingredient and begin process
			inventory.changeIngredientAmount(ingredientLevel.Basic, -1);
		}

		// manual mixing process
		if (flags.isHandMixingIngredients) {
			operations.handMixIngredientsProgress +=
				attributes.mixIngredientsPerSecond * delta_sec;
			operations.handMixIngredientsProgress =
				Math.round(operations.handMixIngredientsProgress * 1e3) / 1e3;
		}

		// help from friends with basic mixing
		if (flags.initialProductionHelpCycles > 0) {
			operations.handMixIngredientsProgress +=
				attributes.mixIngredientsPerSecond * delta_sec;
			operations.handMixIngredientsProgress =
				Math.round(operations.handMixIngredientsProgress * 1e3) / 1e3;
		}
	},
};

export const initialMixIngredients_complete = {
	enabled: true,

	priority: 40,

	run(worldState: WorldState, delta_sec: number) {
		const {
			worldFlags: flags,
			inventory,
			worldOperations: operations,
			playerAttributes: attributes,
			traitGenerator,
			storage,
		} = worldState;

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
				if (
					storage.initialStorageTraits.length <
					storage.currentMaxInitialStorageSize
				) {
					storage.addToInitialStorage(traitGenerator.generateSingle());
				} else {
					toast.error(
						`Out of space! Had to throw away ${mixed} trait${
							mixed > 1 ? "s" : ""
						}.`
					);
				}
				worldState.totalTraitsProduced++;
			}

			// remove help from friends for future cycles
			if (flags.initialProductionHelpCycles > 0) {
				flags.initialProductionHelpCycles -= mixed;
				flags.initialProductionHelpCycles = Math.max(
					0,
					flags.initialProductionHelpCycles
				);
			}
		}
	},
};
