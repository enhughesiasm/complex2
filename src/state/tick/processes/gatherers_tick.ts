import { JobTypes } from "./../../jobs/job_types";
import WorldState from "../../world_state";
import Employee from "../../employees/employee";
import PlayerAttributes from "../../player_attributes";
import Inventory from "../../inventory/inventory";

export const gatherers_tick = {
	enabled: true,
	id: "GATHERERS_TICK",
	priority: 21,

	run(worldState: WorldState, delta_sec: number) {
		const { employees, playerAttributes: attributes, inventory } = worldState;

		const gatherers = employees.all.filter(
			(a) => a.assignedJob === JobTypes.Gathering
		);

		if (gatherers.length === 0) return;

		gatherers.forEach((g) => tickGatherer(g, attributes, inventory, delta_sec));
	},
};

function tickGatherer(
	emp: Employee,
	attributes: PlayerAttributes,
	inventory: Inventory,
	delta_sec: number
) {
	// TK
	// this is just BASIC ingredients. need to have them TRAVEL to a location, then gather, then return
	// state machines for each type...!
	// jobStatus == Gather_Travel, etc

	// TK also needs to take into account employee experience
	emp.currentJobProgress +=
		attributes.e_gath_baseSpeed * attributes.overallWorkFactor * delta_sec;
	emp.currentAction = "Gathering";
	emp.secsSinceCompleted += delta_sec;

	let gathered = 0;
	while (emp.currentJobProgress >= 100) {
		gathered++;
		emp.currentJobProgress -= 100;
	}

	if (gathered > 0) {
		emp.currentJobProgress = 0;
		// TK add experience here
		inventory.changeIngredientAmount(0, gathered); // TK only gathers on level 0 atm!!
		emp.secsSinceCompleted = 0;
		emp.completedMessage = `+${gathered}`; // `+${gathered} basic ingredient${
		// 	gathered > 1 ? "s" : ""
		// }`;
	}
}
