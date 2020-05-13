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
];

export default initialProcesses;
