import { JobTypes } from "./../../jobs/job_types";
import WorldState from "../../world_state";
import Employee from "../../employees/employee";
import PlayerAttributes from "../../player_attributes";
import TraitStorage from "../../trait_storage/trait_storage";
import IAction from "./IAction";
import TraitsSet from "../../trait_storage/traits_set";
import Research from "../../research/research";

const mixerActionTypes = {
	Fetching: "Fetching",
	Mixing: "Mixing",
};

const mixerActions: Array<IAction> = [
	{
		action: mixerActionTypes.Fetching,
		nextAction: mixerActionTypes.Mixing,
		getSpeed(attributes: PlayerAttributes, research: Research) {
			return attributes.getSimpleTaskSpeed(research);
		},
	},
	{
		action: mixerActionTypes.Mixing,
		nextAction: mixerActionTypes.Fetching,
		getSpeed(attributes: PlayerAttributes, research: Research) {
			return attributes.e_mix_baseSpeed;
		},
	},
];

export const mixers_tick = {
	enabled: true,
	id: "MIXERS_TICK",
	priority: 22,

	run(worldState: WorldState, delta_sec: number) {
		const { employees, playerAttributes: attributes, storage } = worldState;

		const mixers = employees.all.filter(
			(a) => a.assignedJob === JobTypes.Mixing
		);

		if (mixers.length === 0) return;

		mixers.forEach((m) =>
			tickMixer(m, attributes, storage, worldState, delta_sec)
		);
	},
};

function tickMixer(
	emp: Employee,
	attributes: PlayerAttributes,
	storage: TraitStorage,
	worldState: WorldState,
	delta_sec: number
) {
	const { inventory, research } = worldState;

	if (!emp.currentAction) {
		emp.currentAction = mixerActions[0].action;
	}

	const action = mixerActions.find((a) => a.action === emp.currentAction);
	if (!action) return;

	emp.currentJobProgress +=
		action.getSpeed(attributes, research) *
		attributes.overallWorkFactor *
		delta_sec;

	emp.secsSinceCompleted += delta_sec;

	let completed = 0;
	while (emp.currentJobProgress >= 100) {
		completed++;
		emp.currentJobProgress -= 100;
	}

	if (completed > 0) {
		emp.currentJobProgress = 0;
		// TK add experience here

		switch (action.action) {
			case mixerActionTypes.Fetching:
				// pick up ingredients, put them in carrying

				const attemptToMake = 1; // TK: making more than one at a time

				// as long as we can take our minimum we take as many as exist in storage up to the current carry capacity
				emp.carrying = inventory.tryRemoveIngredients(attemptToMake);

				if (emp.carrying.getTotal() > 0) {
					// if we have any ingredients at all, move on
					// TK: possibly will need to wait for minimum amounts and do a canRemove check first
					emp.currentAction = action.nextAction;
				}

				break;
			case mixerActionTypes.Mixing:
				// calculate amount to make based on carried ingredients too

				const toMake = emp.carrying ?? new TraitsSet(); // TK: making more than one per end-of-cycle
				// possibly we need to have a .multiply method on traitsSet that allows it to be rapidly scaled
				// 2 per ingredient, etc. or maybe * (10 - level) or something so common ingredients make more?
				// does the number of cycles actually matter here?

				if (toMake.getTotal() > 0) {
					const made = storage.addTraits(
						toMake,
						attributes.getRarityLevel(worldState.research), // TK: this could be added to by more experienced employees
						worldState.traitGenerator,
						attributes,
						research
					);

					const madeTotal = made.getTotal();

					worldState.totalTraitsProduced += madeTotal;
					worldState.totalTraitsWasted += toMake.getTotal() - madeTotal;

					emp.secsSinceCompleted = 0;
					emp.completedMessage = `+${madeTotal}`;
					emp.currentAction = action.nextAction;
				} else {
					// go back to fetching
					emp.currentAction = action.nextAction;
				}

				break;
			default:
				console.error("Invalid action: " + action.action);
				break;
		}
	}
}
