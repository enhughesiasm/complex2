import IWorldState from './IWorldState';

export enum GameTabs {
	HOME,
	PRODUCTION,
	STATS,
}

export default interface IGameState {
	debug: boolean;
	version: string;

	worldState: IWorldState;

	tickLengthMs: number;

	visibleTab: GameTabs;
	patchNotesActive: boolean;

	areSurroundingsUnlocked(): boolean;

	handProduceTrait(): void;
	handDeliverTrait(id: string): void;

	[index: string]: any; // string index
}
