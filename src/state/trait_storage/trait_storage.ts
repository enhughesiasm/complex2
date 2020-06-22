import ITrait from "../traits/ITrait";
import initialStorages from "../data/initial_storages";
import TraitsSet from "./traits_set";
import PlayerAttributes from "../player_attributes";
import TraitGenerator from "../traits/generator/trait_generator";
import Research from "../research/research";

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
		return 2000000;
	}

	getTotalStored(): number {
		return this.stored.getTotal();
	}

	getHighestRarity(): number {
		return this.stored.getMaxNonZeroLevel();
	}

	getAmount(level: number) {
		return this.stored.get(level);
	}

	isFull(): boolean {
		return this.getTotalStored() >= this.getCapacity();
	}

	/** add traits to storage and return the amount that were successfully added */
	addTraits(
		toMake: TraitsSet,
		maximumRarityLevel: number,
		generator: TraitGenerator,
		attributes: PlayerAttributes,
		research: Research
	): TraitsSet {
		if (!toMake || toMake.getTotal() <= 0 || maximumRarityLevel < 0)
			return new TraitsSet();

		const originalTarget = toMake.getTotal();

		// can't make traits any higher than the max ingredient input
		const maxPermittedLevel = toMake.getMaxNonZeroLevel();

		// scale down the amount to make based on storage capacity - if full, the ingredients are wasted
		let prevStored = this.getTotalStored();
		let newTotal = Math.min(prevStored + toMake.getTotal(), this.getCapacity());

		let canMakeWithinCapacity = Math.max(newTotal - prevStored);
		if (canMakeWithinCapacity <= 0) return new TraitsSet();

		const wastedIngredientAmount = toMake.getTotal() - canMakeWithinCapacity;

		if (wastedIngredientAmount > 0) {
			// scale down what we're going to make
			toMake.removeCommonFirst(wastedIngredientAmount);
		}

		const madeTraits = generator.generateMany(
			toMake,
			attributes,
			research,
			maxPermittedLevel
		);
		this.stored.addTraitsSet(madeTraits);

		if (madeTraits.getTotal() + wastedIngredientAmount !== originalTarget) {
			console.error("incorrect wasting in storage.addTraits");
		}

		return madeTraits;
	}

	canRemove(amount: number): boolean {
		return amount <= this.getTotalStored();
	}

	/** remove traits from storage, returning only the amount that are successfully removed */
	removeTraits(amount: number): TraitsSet {
		if (amount <= 0) return new TraitsSet();
		return this.stored.removeRarestFirst(amount);
	}

	/** get as many traits as possible up to a desired amount, from the rarest levels first, WITHOUT modifying storage */
	peekRarestFirst(desiredAmount: number): TraitsSet {
		if (desiredAmount <= 0) return new TraitsSet();
		return this.stored.peekRarestFirst(desiredAmount);
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
