import { toast } from "react-toastify";
import WorldState from "../../world_state";

export const initialMixIngredients_progress = {
	enabled: true,
	id: "IMIX_PROGRESS",
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
			if (inventory.getIngredientAmount(0) <= 0) {
				// always level 0
				// can't mix
				return;
			}

			// can mix, use up ingredient and begin process
			inventory.changeIngredientAmount(0, -1); // always level 0, always one ingredient cost
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
	id: "IMIX_COMPLETE",
	priority: 15,

	run(worldState: WorldState, delta_sec: number) {
		const {
			worldFlags: flags,
			worldOperations: operations,
			traitGenerator,
			storage,
			playerAttributes: attributes,
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
					storage.addToInitialStorage(
						traitGenerator.generateSingleAtSpecificLevel(0, attributes) // always level 0
					);
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
