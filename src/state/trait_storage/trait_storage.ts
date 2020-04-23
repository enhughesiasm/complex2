import { IHandsStorage } from "./../IWorldState";
import ITrait from "../traits/ITrait";
import handsStorage from "../data/hands_storages";

export default class TraitStorage {
	handTraits: Array<ITrait> = [];
	handSurroundings: IHandsStorage = handsStorage[0];
}
