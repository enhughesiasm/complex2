import { explorers_tick } from "./processes/explorers_tick";
import { deliverers_tick } from "./processes/deliverers_tick";
import { mixers_tick } from "./processes/mixers_tick";
import { employees_tick } from "./processes/employees_tick";
import {
	initialDelivery_progress,
	initialDelivery_complete,
} from "./processes/initial_delivery";
import {
	initialMixIngredients_progress,
	initialMixIngredients_complete,
} from "./processes/initial_mix_ingredients";
import {
	gatherBasicIngredients_progress,
	gatherBasicIngredients_complete,
} from "./processes/gather_basic_ingredients";
import { ITickProcess } from "./ITickProcess";
import { gatherers_tick } from "./processes/gatherers_tick";

const initialProcesses: Array<ITickProcess> = [
	// initial gather
	gatherBasicIngredients_progress,
	gatherBasicIngredients_complete,

	// initial mix
	initialMixIngredients_progress,
	initialMixIngredients_complete,

	// initial deliver
	initialDelivery_progress,
	initialDelivery_complete,

	// employee management
	employees_tick,

	// gatherers
	gatherers_tick,

	//  mixers
	mixers_tick,

	deliverers_tick,
	explorers_tick,
];

export default initialProcesses;
