import LettersManager, { ILettersManager } from "./letters/letter_manager";
import { ITraitGenerator } from "./traits/ITraitGenerator";
import IWorldState, { IHandsStorage, IResearchCompleted } from "./IWorldState";
import TraitGenerator from "./traits/generator/trait_generator";
import Inventory from "./inventory/inventory";
import Flags from "./world_flags";
import WorldOperations from "./world_operations";
import PlayerAttributes from "./player_attributes";
import TraitStorage from "./trait_storage/trait_storage";

export default class WorldState implements IWorldState {
	favours: number = 0;
	totalTraitsProduced: number = 0;
	totalTraitsDelivered: number = 0;

	worldFlags: Flags = new Flags();
	worldOperations: WorldOperations = new WorldOperations();
	playerAttributes: PlayerAttributes = new PlayerAttributes();

	letterManager: ILettersManager = new LettersManager();

	inventory: Inventory = new Inventory();

	traitGenerator: ITraitGenerator = new TraitGenerator();

	storage: TraitStorage = new TraitStorage();

	researchCompleted: IResearchCompleted = {};

	[index: string]: any;
}
