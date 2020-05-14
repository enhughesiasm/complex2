import { ingredientLevel } from "./data/ingredient_levels";
import WorldState from "./world_state";

const debugValues: WorldState = new WorldState();

debugValues.debug = true;

debugValues.storage.initialStorageTraits.push(
	debugValues.traitGenerator.generateSingle()
);
debugValues.storage.initialStorageTraits.push(
	debugValues.traitGenerator.generateSingle()
);

debugValues.inventory.setIngredientAmount(ingredientLevel.Basic, 5);
debugValues.totalTraitsProduced = 2;

export default debugValues;
