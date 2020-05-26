import { ITraitsSet } from "./traits_set";
import ITrait from "../traits/ITrait";
import initialStorages from "../data/initial_storages";
import rarities from "../traits/rarity_levels";

export interface IInitialStorage {
	name: string;
	minimumCapacity: number;
	backgroundColor: string;
	backgroundImage: string;
	backgroundSize: string;
	backgroundPosition?: string;
}

export default class TraitStorage {
	storedAmount: Array<ITraitsSet>;

	constructor() {
		this.storedAmount = [];

		for (let level of rarities.rarityLevels) {
			this.storedAmount.push({
				amount: 0,
				rarity: level,
			});
		}
	}

	getCapacity(): number {
		return 20;
	}

	getTotalStored(): number {
		return this.storedAmount
			.map((a) => a.amount)
			.reduce((total, n) => total + n, 0);
	}

	isFull(): boolean {
		return false; // this.storedAmount >= this.getCapacity();
	}

	/** add traits to storage and return the amount that were successfully added */
	addTraits(amount: number, maximumRarityLevel: number): number {
		if (amount <= 0) return 0;
		if (maximumRarityLevel < 0) return 0;

		let prevStored = this.getTotalStored();
		let newTotal = Math.min(prevStored + amount, this.getCapacity());

		let amountToMake = Math.max(newTotal - prevStored);
		if (amountToMake <= 0) return 0;

		// TK: calculate probability of getting amounts at various rarities
		// for now, just create them at the maximum allowed level
		this.storedAmount[0].amount += amountToMake;

		return Math.max(amountToMake, 0);
	}

	canRemove(amount: number): boolean {
		return amount <= this.getTotalStored();
	}

	/** remove traits from storage, returning the amount that are successfully removed */
	removeTraits(amount: number): number {
		if (amount <= 0) return 0;

		// TK: this needs to remove by rarity and be MUCH cleverer
		// think about how to make this bug-free :(

		if (amount < this.getTotalStored()) {
			this.storedAmount[0].amount -= amount;
			return amount;
		}

		// asking for everything, so empty the storage
		const prevStored = this.getTotalStored();
		this.storedAmount[0].amount = 0;
		return prevStored;
	}

	/* INITIAL HOME STORAGE BELOW */

	// initial
	currentMaxInitialStorageSize = 5;
	absoluteMaxInitialStorageSize = 100;
	initialStorageTraits: Array<ITrait> = [];
	initialStorage: IInitialStorage = initialStorages[0];

	addToInitialStorage(trait: ITrait): boolean {
		if (this.initialStorageTraits.length >= this.currentMaxInitialStorageSize) {
			return false;
		}

		this.initialStorageTraits.push(trait);
		return true;
	}

	canExpandInitialStorage() {
		return (
			this.currentMaxInitialStorageSize < this.absoluteMaxInitialStorageSize
		);
	}

	expandInitialStorage() {
		this.currentMaxInitialStorageSize *= 1.5;
		this.currentMaxInitialStorageSize = Math.ceil(
			this.currentMaxInitialStorageSize
		);
		this.currentMaxInitialStorageSize = Math.min(
			this.currentMaxInitialStorageSize,
			this.absoluteMaxInitialStorageSize
		);

		let t: IInitialStorage = initialStorages[0];
		initialStorages.forEach((hs) => {
			if (hs.minimumCapacity <= this.currentMaxInitialStorageSize) {
				t = hs;
			}
		});

		if (t) {
			this.initialStorage = t;
		}
	}
}
