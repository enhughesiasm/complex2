import { ingredientLevel } from "./data/ingredient_levels";
import IWorldState from "./IWorldState";
import WorldState from "./world_state";

const debugValues: IWorldState = new WorldState();

debugValues.debug = true;

debugValues.storage.handTraits.push(
	debugValues.traitGenerator.generateSingle()
);
debugValues.storage.handTraits.push(
	debugValues.traitGenerator.generateSingle()
);

debugValues.inventory.setIngredientAmount(ingredientLevel.Basic, 5);
debugValues.totalTraitsProduced = 2;

export default debugValues;
