import { maxRarityFactor } from "./constants";
import Research from "./research/research";
import ResearchIds from "./data/research_items/r_ids";

export default class PlayerAttributes {
	overallWorkFactor: number = 1;

	// unlockedRarityLevel = 0; // this is a basic upgrade
	getRarityLevel(research: Research): number {
		let level = 0;

		for (let i = 0; i < maxRarityFactor; i++) {
			const item = research.getItem(ResearchIds.TraitRarityPrefix + i);
			if (item.completed) {
				level += item.getValue();
			} else {
				break;
			}
		}

		return level;
	}

	rarityIncreaseFlatRate = 0.02;
	rarityIncreaseBonusChance = 0.1; // adding to this is a POWERFUL upgrade

	// employee happiness
	employeeHappiness_decayFactor: number = 0.000004;
	employeeHappiness_min: number = 0.5;
	employeeHappiness_max: number = 2;

	// simple tasks like fetching ingredients etc
	//simple_task_baseSpeed = 40;
	getSimpleTaskSpeed(research: Research): number {
		return (
			40 * (research.isComplete(ResearchIds.BasicEmployeeTraining) ? 1.5 : 1)
		);
	}

	// all employees base travel speed
	e_travel_baseSpeed = 0.35;

	// employee gatherers
	e_gath_baseSpeed = 30;

	// employee mixers
	e_mix_baseSpeed = 20;

	e_research_baseSpeed = 10;

	e_build_base_speed = 5;

	// employee deliverers
	deliveryCarryCapacity = 20;
	minimumDeliveryBatchSize = 1; // TK: expose this as clickable option

	// employee explorers
	e_explore_baseSpeed = 1; // time to fully explore a tile

	/* INITIAL - AT HOME - JOB SPEEDS */
	// base speed for initial gathering
	gatherBasicIngredientsPerSecond: number = 60;

	// base amount of assistance with initial gathering
	manualGatherHelpAmount = 2;

	// base speed for initial production
	mixIngredientsPerSecond: number = 50;

	// base assistance for initial production
	initialProductionHelpAmount = 2;

	// base speed for initial delivery
	handDeliveryProgressPerSecond: number = 10;

	getDeliveryCarryCapacity(research: Research): number {
		return (
			this.deliveryCarryCapacity +
			research.getItem(ResearchIds.Backpack).getValue()
		);
	}
}
