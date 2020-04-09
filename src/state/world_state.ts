import { ITraitGenerator } from './traits/ITraitGenerator';
import IWorldState, { IHandsStorage, IResearchCompleted } from './IWorldState';
import ITrait from './traits/ITrait';
import TraitGenerator from './traits/generator/trait_generator';
import handsStorage from './data/hands_storages';

export default class WorldState implements IWorldState {
	favours: number = 0;
	totalTraitsProduced: number = 0;
	totalTraitsDelivered: number = 0;
	handTraits: Array<ITrait> = [];

	traitGenerator: ITraitGenerator = new TraitGenerator();

	handSurroundings: IHandsStorage = handsStorage[0];

	researchCompleted: IResearchCompleted = {};

	[index: string]: any;
}
