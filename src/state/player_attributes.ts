export default class PlayerAttributes {
	overallWorkFactor: number = 1;

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

	// employee gatherers
	e_gath_baseSpeed = 30;

	// employee mixers
	e_mix_baseSpeed = 20;
	maximumRarityLevel = 0;

	// employee deliverers
	e_deliver_baseSpeed = 5;
	deliveryCarryCapacity = 5;
	minimumDeliveryBatchSize = 3; // TK: expose this as clickable option
}
