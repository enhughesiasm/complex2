import ITrait from "../traits/ITrait";
import initialStorages from "../data/initial_storages";

export interface IInitialStorage {
	name: string;
	minimumCapacity: number;
	backgroundColor: string;
	backgroundImage: string;
	backgroundSize: string;
	backgroundPosition?: string;
}

export default class TraitStorage {
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
