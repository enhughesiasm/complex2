import rarities from "../traits/rarity_levels";
import Enumerable, { IEnumerable } from "linq";

export interface ITraitsLevel {
	level: number;
	amount: number;
}

export default class TraitsSet {
	traits: { [key: number]: number } = {};

	total: number = 0;

	maxLevel: number = 0;

	levels: Array<number>;

	constructor() {
		this.levels = [];
		for (let level of rarities.rarityLevels) {
			this.set(level.level, 0);
			this.levels.push(level.level);
		}

		this.maxLevel = Math.max(...this.levels);
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

	getMaxNonZeroLevel(): number {
		for (let i = this.maxLevel; i > 0; i--) {
			if (this.get(i) > 0) return i;
		}

		return 0;
	}

	/** moves a fraction of traits up a level from each level */
	moveFractionUpLevel(
		fraction: number,
		bonusChance: number,
		maximumRarityLevel: number
	) {
		if (fraction < 0 || fraction > 1) {
			console.error("invalid fraction: " + fraction);
			return;
		}
		if (bonusChance < 0 || bonusChance > 1) {
			console.error("invalid bonusChance: " + bonusChance);
			return;
		}

		const initialTotal = this.getTotal();

		this.levels.forEach((l) => {
			if (l !== rarities.maxLevel && l < maximumRarityLevel) {
				const toMove = Math.floor(this.get(l) * fraction);
				if (toMove > 0) {
					this.change(l, -toMove);
					this.change(l + 1, toMove);
				}

				if (Math.random() < bonusChance) {
					const bonusMove = Math.floor(this.get(l) * fraction);
					if (bonusMove > 0) {
						this.change(l, -bonusMove);
						this.change(l + 1, bonusMove);
					}
				}
			}
		});

		const finalTotal = this.getTotal();
		if (initialTotal !== finalTotal) {
			console.error(
				`bug in moveFractionUpLevel: fraction: ${fraction}; initial: ${initialTotal}; final: ${finalTotal} `
			);
			console.error(this.traits);
		}
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
			const amountToTake = Math.min(
				levelAmount,
				desiredAmount - removed.getTotal()
			);
			this.change(i, -amountToTake);
			removed.set(i, amountToTake);
			amountRemaining -= amountToTake;
		}

		return removed;
	}

	/** returns a new TraitSet containing the amount of stored traits up to the desired amount, rarest first */
	peekRarestFirst(desiredAmount: number): TraitsSet {
		if (desiredAmount <= 0) return new TraitsSet(); // removed none, return empty set

		let removed = new TraitsSet();
		let amountRemaining = desiredAmount;

		for (let i = rarities.maxLevel; i >= 0; i--) {
			if (amountRemaining === 0) break;

			if (amountRemaining < 0) {
				console.error("I screwed up in removeRarestFirst!");
			}

			const levelAmount = this.get(i);
			const amountToTake = Math.min(
				levelAmount,
				desiredAmount - removed.getTotal()
			);
			removed.set(i, amountToTake);
			amountRemaining -= amountToTake;
		}

		return removed;
	}

	/** mutates this traitsSet and returns a new one containing the removed traits */
	removeCommonFirst(desiredAmount: number): TraitsSet {
		if (desiredAmount <= 0) return new TraitsSet(); // removed none, return empty set

		let removed = new TraitsSet();
		let amountRemaining = desiredAmount;

		for (let i = 0; i <= rarities.maxLevel; i++) {
			if (amountRemaining === 0) break;

			if (amountRemaining < 0) {
				console.error("I screwed up in removeCommonFirst!");
			}

			const levelAmount = this.get(i);
			const amountToTake = Math.min(
				levelAmount,
				desiredAmount - removed.getTotal()
			);
			this.change(i, -amountToTake);
			removed.set(i, amountToTake);
			amountRemaining -= amountToTake;
		}

		return removed;
	}
}
