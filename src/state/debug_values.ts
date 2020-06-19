import WorldState from "./world_state";
import { GameTabType } from "./game_tabs";
import { targetIDs } from "./targets/target_ids";
import { JobTypes } from "./jobs/job_types";
import ResearchIds from "./data/research_items/r_ids";

const debugValues: WorldState = new WorldState();

debugValues.debug = true;
debugValues.activeTab = GameTabType.RESEARCH;

debugValues.storage.initialStorageTraits.push(
	debugValues.traitGenerator.generateSingle(
		debugValues.playerAttributes,
		debugValues.research
	)
);
debugValues.storage.initialStorageTraits.push(
	debugValues.traitGenerator.generateSingle(
		debugValues.playerAttributes,
		debugValues.research
	)
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

debugValues.favours = 118000;

const process = debugValues.processList.find((a) => a.id === "EMPLOYEES_TICK");
if (process) {
	process.enabled = true;
}

debugValues.targets
	.find((a) => a.id === targetIDs.UnlockNewJobs)
	?.claim(debugValues);

debugValues.employees.unlockedJobs.push(JobTypes.Researching);

debugValues.employees.hire(
	debugValues.prelifeMap.getTile(debugValues.prelifeMap.COMPLEX_POSITION),
	JobTypes.Gathering
);
debugValues.employees.hire(
	debugValues.prelifeMap.getTile(debugValues.prelifeMap.COMPLEX_POSITION),
	JobTypes.Mixing
);
debugValues.employees.hire(
	debugValues.prelifeMap.getTile(debugValues.prelifeMap.COMPLEX_POSITION),
	JobTypes.Delivering
);
debugValues.employees.hire(
	debugValues.prelifeMap.getTile(debugValues.prelifeMap.COMPLEX_POSITION),
	JobTypes.Researching
);

debugValues.research.markComplete(ResearchIds.Researchers, debugValues);
debugValues.research.markComplete(ResearchIds.Building, debugValues);

debugValues.employees.hire(
	debugValues.prelifeMap.getTile(debugValues.prelifeMap.COMPLEX_POSITION),
	JobTypes.Building
);

// debugValues.employees.hire(
// 	debugValues.prelifeMap.getTile(debugValues.prelifeMap.COMPLEX_POSITION),
// 	JobTypes.Researching
// );
// debugValues.employees.hire(
// 	debugValues.prelifeMap.getTile(debugValues.prelifeMap.COMPLEX_POSITION),
// 	JobTypes.Researching
// );
// debugValues.employees.hire(
// 	debugValues.prelifeMap.getTile(debugValues.prelifeMap.COMPLEX_POSITION),
// 	JobTypes.Researching
// );
// debugValues.employees.hire(
// 	debugValues.prelifeMap.getTile(debugValues.prelifeMap.COMPLEX_POSITION),
// 	JobTypes.Researching
// );

export default debugValues;
