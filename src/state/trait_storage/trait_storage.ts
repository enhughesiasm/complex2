import { IHandsStorage } from "./../IWorldState";
import ITrait from "../traits/ITrait";
import handsStorage from "../data/hands_storages";

export default class TraitStorage {
	maxHandTraitSize = 5;

	handTraits: Array<ITrait> = [];
	handSurroundings: IHandsStorage = handsStorage[0];

	addHandTrait(trait: ITrait): boolean {
		if (this.handTraits.length >= this.maxHandTraitSize) {
			return false;
		}

		this.handTraits.push(trait);
		return true;
	}
}
