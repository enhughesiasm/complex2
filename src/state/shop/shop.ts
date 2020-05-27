import rarities, { IRarityLevel } from "../traits/rarity_levels";
import TraitsSet from "../trait_storage/traits_set";
import WorldState from "../world_state";

export default class Shop {
	demand: TraitsSet;
	received: TraitsSet;

	totalReceived(): number {
		return this.received.getTotal();
	}

	constructor() {
		this.demand = new TraitsSet();
		this.received = new TraitsSet();
	}

	getTraitPayment(level: number, amount: number) {
		// for now do it simple
		return (level + 1) * amount;
	}

	/** updates the Shop received totals and pays out favours */
	deliverTraitsSet(traits: TraitsSet, worldState: WorldState): void {
		this.received.addTraitsSet(traits);

		traits.getIterator().forEach((t) => {
			worldState.favours += this.getTraitPayment(t.level, t.amount);
		});
	}

	receiveTraits(level: IRarityLevel, amount: number) {
		this.received.change(level.level, amount);
	}

	receiveTraitsAtLevelNumber(level: number, amount: number) {
		const l =
			rarities.rarityLevels.find((a) => a.level === level) ||
			rarities.rarityLevels[0];
		this.receiveTraits(l, amount);
	}
}
