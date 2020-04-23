import { ILettersManager } from "./letters/letter_manager";
import Inventory from "./inventory/inventory";
import { ITraitGenerator } from "./traits/ITraitGenerator";
import ITrait from "./traits/ITrait";
import Flags from "./world_flags";
import WorldOperations from "./world_operations";
import PlayerAttributes from "./player_attributes";
import TraitStorage from "./trait_storage/trait_storage";

export interface IHandsStorage {
	name: string;
	capacity: number;
	backgroundColor: string;
	backgroundImage: string;
	backgroundSize: string;
	backgroundPosition?: string;
}

export interface IResearchCompleted {}

export default interface IWorldState {
	favours: number;
	totalTraitsProduced: number;
	totalTraitsDelivered: number;

	inventory: Inventory;

	worldFlags: Flags;
	worldOperations: WorldOperations;
	playerAttributes: PlayerAttributes;

	letterManager: ILettersManager;

	storage: TraitStorage;

	traitGenerator: ITraitGenerator;

	researchCompleted: IResearchCompleted;

	[index: string]: any; // string index
}
