import LettersManager, { ILettersManager } from './letters/letter_manager';
import { ITraitGenerator } from './traits/ITraitGenerator';
import IWorldState, { IHandsStorage, IResearchCompleted } from './IWorldState';
import ITrait from './traits/ITrait';
import TraitGenerator from './traits/generator/trait_generator';
import handsStorage from './data/hands_storages';
import Inventory, { IInventory } from './inventory/inventory';

export default class WorldState implements IWorldState {
	favours: number = 0;
	totalTraitsProduced: number = 0;
	totalTraitsDelivered: number = 0;
	handTraits: Array<ITrait> = [];

	letterManager: ILettersManager = new LettersManager();

	inventory: IInventory = new Inventory();

	traitGenerator: ITraitGenerator = new TraitGenerator();

	handSurroundings: IHandsStorage = handsStorage[0];

	researchCompleted: IResearchCompleted = {};

	[index: string]: any;
}
