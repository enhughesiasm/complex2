export default class PlayerAttributes {
	overallWorkFactor: number = 1;

	maximumRarityLevel = 0; // this is a basic upgrade
	rarityIncreaseFlatRate = 0.02;
	rarityIncreaseBonusChance = 0.1; // adding to this is a POWERFUL upgrade

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

	// employee happiness
	employeeHappiness_decayFactor: number = 0.000002;
	employeeHappiness_min: number = 0.5;
	employeeHappiness_max: number = 2;

	// simple tasks like fetching ingredients etc
	simple_task_baseSpeed = 40;

	// employee gatherers
	e_gath_baseSpeed = 30;

	// employee mixers
	e_mix_baseSpeed = 20;

	// employee deliverers
	e_travel_baseSpeed = 20; // speed through an individual tile
	deliveryCarryCapacity = 5;
	minimumDeliveryBatchSize = 1; // TK: expose this as clickable option
}
