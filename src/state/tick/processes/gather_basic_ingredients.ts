import { ingredientLevel } from "./../../data/ingredient_levels";
import IWorldState from "../../IWorldState";

export const gatherBasicIngredients_progress = {
	enabled: true,

	priority: 10,

	run(worldState: IWorldState, delta_sec: number) {
		const {
			worldFlags: flags,
			worldOperations: operations,
			playerAttributes: attributes,
		} = worldState;

		if (
			flags.isGatheringBasicIngredients &&
			operations.gatherBasicIngredientsProgress === 0
		) {
			// starting anew
		}

		// manual ingredient gathering progress - self gathering
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
	},
};

export const gatherBasicIngredients_complete = {
	enabled: true,

	priority: 40,

	run(worldState: IWorldState, delta_sec: number) {
		const {
			worldFlags: flags,
			inventory,
			worldOperations: operations,
			playerAttributes: attributes,
		} = worldState;

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
				flags.manualGatherHelpCycles = Math.max(
					0,
					flags.manualGatherHelpCycles
				);
			}
			inventory.changeIngredientAmount(ingredientLevel.Basic, gathered);
		}
	},
};
