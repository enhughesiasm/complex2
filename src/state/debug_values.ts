import { ingredientLevel } from "./data/ingredient_levels";
import WorldState from "./world_state";
import { GameTabType } from "./game_tabs";

const debugValues: WorldState = new WorldState();

debugValues.debug = true;
debugValues.activeTab = GameTabType.SHOP;

debugValues.storage.initialStorageTraits.push(
	debugValues.traitGenerator.generateSingle()
);
debugValues.storage.initialStorageTraits.push(
	debugValues.traitGenerator.generateSingle()
);

debugValues.inventory.setIngredientAmount(ingredientLevel.Basic, 5);
debugValues.totalTraitsProduced = 2;

debugValues.shop.receiveTraitsAtLevelNumber(0, 10);

debugValues.worldFlags.handDeliveredFirstBatch = true;

export default debugValues;
