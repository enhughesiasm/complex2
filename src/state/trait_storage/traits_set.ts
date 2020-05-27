import rarities from "../traits/rarity_levels";
import Enumerable, { IEnumerable } from "linq";

export interface ITraitsLevel {
	level: number;
	amount: number;
}

export default class TraitsSet {
	traits: { [key: number]: number } = {};

	total: number = 0;

	levels: Array<number>;

	constructor() {
		this.levels = [];
		for (let level of rarities.rarityLevels) {
			this.set(level.level, 0);
			this.levels.push(level.level);
		}
	}

	recalculateTotal(): void {
		let t = 0;
		for (let level of rarities.rarityLevels) {
			t += this.get(level.level);
		}
		this.total = t;
	}

	getIterator(): IEnumerable<ITraitsLevel> {
		let r: Array<ITraitsLevel> = [];
		this.levels.forEach((l) => {
			r.push({ level: l, amount: this.get(l) });
		});
		return Enumerable.from(r);
	}

	set(level: number, amount: number): void {
		if (amount < 0) {
			// presumably indicates a bug elsewhere; log and continue
			console.error("attempting to set negative value on trait level " + level);
		}
		this.traits[level] = amount;
		this.recalculateTotal();
	}

	get(level: number): number {
		return this.traits[level];
	}

	change(level: number, amount: number): void {
		this.set(level, this.get(level) + amount);
	}

	clear(): void {
		this.traits = {};
	}

	getTotal(): number {
		return this.total;
	}

	/** mutates this traitsSet by adding at each level */
	addTraitsSet(ts: TraitsSet) {
		ts.getIterator().forEach((l) => {
			this.change(l.level, l.amount);
		});
	}

	/** mutates this traitsSet and returns a new one containing the removed traits */
	removeRarestFirst(desiredAmount: number): TraitsSet {
		if (desiredAmount <= 0) return new TraitsSet(); // removed none, return empty set

		let removed = new TraitsSet();
		let amountRemaining = desiredAmount;

		for (let i = rarities.maxLevel; i >= 0; i--) {
			if (amountRemaining === 0) break;

			if (amountRemaining < 0) {
				console.error("I screwed up in removeRarestFirst!");
			}

			const levelAmount = this.get(i);
			const amountToTake = Math.min(levelAmount, desiredAmount);
			this.change(i, -amountToTake);
			removed.set(i, amountToTake);
			amountRemaining -= amountToTake;
		}

		return removed;
	}
}
