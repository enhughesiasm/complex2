import WorldState from "./world_state";
import { GameTabType } from "./game_tabs";
import { targetIDs } from "./targets/target_ids";
import { JobTypes } from "./jobs/job_types";

const debugValues: WorldState = new WorldState();

debugValues.debug = true;
debugValues.activeTab = GameTabType.MAP;

debugValues.storage.initialStorageTraits.push(
	debugValues.traitGenerator.generateSingle(debugValues.playerAttributes)
);
debugValues.storage.initialStorageTraits.push(
	debugValues.traitGenerator.generateSingle(debugValues.playerAttributes)
);

debugValues.inventory.setIngredientAmount(0, 5);
debugValues.inventory.setIngredientAmount(5, 0);
debugValues.totalTraitsProduced = 2;

debugValues.shop.receiveTraitsAtLevelNumber(0, 100);

debugValues.worldFlags.handDeliveredFirstBatch = true;

// okay this is getting dirty. need a better way to debug during dev
debugValues.targets[0].claim(debugValues);
debugValues.employees.unlocked = true;

debugValues.letterManager.markAllRead();

debugValues.favours = 1000;

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
