import IWorldState from './IWorldState';

export enum GameTabs {
	HANDS = 'HANDS',
	LETTERS = 'LETTERS',

	PRODUCTION = 'PRODUCTION',
	STATS = 'STATS',
}

export default interface IGameState {
	debug: boolean;
	version: string;

	worldState: IWorldState;

	tickLengthMs: number;

	activeTab: GameTabs;
	patchNotesActive: boolean;

	changeActiveTab(tab: GameTabs): void;

	areSurroundingsUnlocked(): boolean;

	handProduceTrait(): void;
	handDeliverTrait(id: string): void;

	[index: string]: any; // string index
}
