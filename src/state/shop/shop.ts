import rarities, { IRarityLevel } from "../traits/rarity_levels";

export default class Shop {
	demand: Map<IRarityLevel, boolean>;

	received: Map<IRarityLevel, number>;

	totalReceived: number = 0;

	constructor() {
		this.demand = new Map<IRarityLevel, boolean>();
		this.received = new Map<IRarityLevel, number>();

		for (let i of rarities.rarityLevels) {
			this.demand.set(i, i.level === 0 ? true : false);
			this.received.set(i, 0);
		}
	}

	getTraitPayment(level: number, amount: number) {
		// for now do it simple
		return (level + 1) * amount;
	}

	receiveTraits(level: IRarityLevel, amount: number) {
		const prev = this.received.get(level) || 0;
		this.received.set(level, prev + amount);
		this.totalReceived += amount;
	}

	receiveTraitsAtLevelNumber(level: number, amount: number) {
		const l =
			rarities.rarityLevels.find((a) => a.level === level) ||
			rarities.rarityLevels[0];
		this.receiveTraits(l, amount);
	}
}
