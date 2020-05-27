import { ITraitGenerator } from "./../traits/generator/ITraitGenerator";
import ITrait from "../traits/ITrait";
import initialStorages from "../data/initial_storages";
import TraitsSet from "./traits_set";

export interface IInitialStorage {
	name: string;
	minimumCapacity: number;
	backgroundColor: string;
	backgroundImage: string;
	backgroundSize: string;
	backgroundPosition?: string;
}

export default class TraitStorage {
	stored: TraitsSet = new TraitsSet();

	getCapacity(): number {
		return 20;
	}

	getTotalStored(): number {
		return this.stored.getTotal();
	}

	isFull(): boolean {
		return false; // this.storedAmount >= this.getCapacity();
	}

	/** add traits to storage and return the amount that were successfully added */
	addTraits(
		amount: number,
		maximumRarityLevel: number,
		generator: ITraitGenerator
	): number {
		if (amount <= 0) return 0;
		if (maximumRarityLevel < 0) return 0;

		let prevStored = this.getTotalStored();
		let newTotal = Math.min(prevStored + amount, this.getCapacity());

		let amountToMake = Math.max(newTotal - prevStored);
		if (amountToMake <= 0) return 0;

		// TK: calculate probability of getting amounts at various rarities
		// for now, just create them at the maximum allowed level
		// TK: call traitGenerator
		// const madeTraits = generator.generateMany(amountToMake) :TraitsSet;
		//  TraitsSet needs an addSet(set:TraitsSet) option
		const levelToMake = 0;
		this.stored.change(levelToMake, amountToMake);

		return Math.max(amountToMake, 0);
	}

	canRemove(amount: number): boolean {
		return amount <= this.getTotalStored();
	}

	/** remove traits from storage, returning only the amount that are successfully removed */
	removeTraits(amount: number): TraitsSet {
		if (amount <= 0) return new TraitsSet();
		return this.stored.removeRarestFirst(amount);
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
