import { ingredientLevel } from "./data/ingredient_levels";
import WorldState from "./world_state";
import { GameTabType } from "./game_tabs";
import { targetIDs } from "./targets/target_ids";
import { JobTypes } from "./jobs/job_types";

const debugValues: WorldState = new WorldState();

debugValues.debug = true;
debugValues.activeTab = GameTabType.EMPLOYEES;

debugValues.storage.initialStorageTraits.push(
	debugValues.traitGenerator.generateSingle()
);
debugValues.storage.initialStorageTraits.push(
	debugValues.traitGenerator.generateSingle()
);

debugValues.inventory.setIngredientAmount(ingredientLevel.Basic, 5);
debugValues.totalTraitsProduced = 2;

debugValues.shop.receiveTraitsAtLevelNumber(0, 100);

debugValues.worldFlags.handDeliveredFirstBatch = true;

// okay this is getting dirty. need a better way to debug during dev
debugValues.targets[0].claim(debugValues);
debugValues.employees.unlocked = true;

debugValues.letterManager.markAllRead();

const process = debugValues.processList.find((a) => a.id === "EMPLOYEES_TICK");
if (process) {
	process.enabled = true;
}

debugValues.employees.hire();
debugValues.employees.hire();
debugValues.employees.hire();

debugValues.employees.all[0].assign(JobTypes.Gathering);
debugValues.employees.all[1].assign(JobTypes.Mixing);
debugValues.employees.all[2].assign(JobTypes.Delivering);

debugValues.targets
	.find((a) => a.id === targetIDs.UnlockNewJobs)
	?.claim(debugValues);

export default debugValues;
