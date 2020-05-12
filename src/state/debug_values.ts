import { ingredientLevel } from "./data/ingredient_levels";
import IWorldState from "./IWorldState";
import generateTrait from "./traits/generator/generate_trait";
import WorldState from "./world_state";

const debugValues: IWorldState = new WorldState();

debugValues.debug = true;

debugValues.storage.handTraits.push(generateTrait(debugValues.traitGenerator));
debugValues.storage.handTraits.push(generateTrait(debugValues.traitGenerator));


debugValues.inventory.setIngredientAmount(ingredientLevel.Basic, 5);
debugValues.totalTraitsProduced = 2;

export default debugValues;
