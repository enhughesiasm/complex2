import { toast } from "react-toastify";
import { ITraitGenerator } from "./../../traits/generator/ITraitGenerator";
import moment from "moment";
import { JobTypes } from "./../../jobs/job_types";
import WorldState from "../../world_state";
import Employee from "../../employees/employee";
import PlayerAttributes from "../../player_attributes";
import TraitStorage from "../../trait_storage/trait_storage";

export const mixers_tick = {
	enabled: true,
	id: "MIXERS_TICK",
	priority: 22,

	run(worldState: WorldState, delta_sec: number) {
		const {
			employees,
			playerAttributes: attributes,
			traitGenerator: generator,
			storage,
		} = worldState;

		const mixers = employees.all.filter(
			(a) => a.assignedJob === JobTypes.Mixing
		);

		if (mixers.length === 0) return;

		mixers.forEach((m) =>
			tickMixer(m, attributes, storage, generator, worldState, delta_sec)
		);
	},
};

function tickMixer(
	emp: Employee,
	attributes: PlayerAttributes,
	storage: TraitStorage,
	generator: ITraitGenerator,
	worldState: WorldState,
	delta_sec: number
) {
	// TK
	// this is just BASIC ingredients. need to have them TRAVEL to a location, then gather, then return
	// state machines for each type...!
	// jobStatus == Gather_Travel, etc

	// TK also needs to take into account employee experience
	emp.currentJobProgress +=
		attributes.e_mix_baseSpeed * attributes.overallWorkFactor * delta_sec;
	emp.currentAction = "Mixing";
	emp.secsSinceCompleted += delta_sec;

	let mixed = 0;
	while (emp.currentJobProgress >= 100) {
		mixed++;
		emp.currentJobProgress -= 100;
	}

	if (mixed > 0) {
		emp.currentJobProgress = 0;
		// TK add experience here

		const made = storage.addTraits(mixed, attributes.maximumRarityLevel);
		worldState.totalTraitsProduced += made;
		worldState.totalTraitsWasted += mixed - made;

		emp.secsSinceCompleted = 0;
		emp.completedMessage = `+${mixed}`;
	}
}
