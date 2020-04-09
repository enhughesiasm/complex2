import { ITraitGenerator } from './traits/ITraitGenerator';
import ITrait from './traits/ITrait';

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

	handTraits: Array<ITrait>;
	handSurroundings: IHandsStorage;

	traitGenerator: ITraitGenerator;

	researchCompleted: IResearchCompleted;

	[index: string]: any; // string index
}
