import { version, tickLengthMs } from './constants';
import { GameTabs } from './IGameState';
import IGameState from './IGameState';
import IWorldState from './IWorldState';
import generateTrait from './traits/generator/generate_trait';

const debug = true;

export default class GameState implements IGameState {
	constructor(worldState: IWorldState) {
		this.worldState = worldState;
	}

	debug: boolean = debug;
	activeTab: GameTabs = !debug ? GameTabs.HANDS : GameTabs.LETTERS;

	version: string = version;
	tickLengthMs: number = tickLengthMs;

	patchNotesActive: boolean = false;
	worldState: IWorldState;

	togglePatchNotes = () => {
		this.patchNotesActive = !this.patchNotesActive;
	};

	changeActiveTab = (tab: GameTabs) => {
		this.activeTab = tab;
	};

	areSurroundingsUnlocked() {
		return this.worldState.totalTraitsProduced > 0;
	}

	handProduceTrait(): void {
		this.worldState.handTraits.push(
			generateTrait(this.worldState.traitGenerator)
		);

		this.worldState.totalTraitsProduced++;
	}

	handDeliverTrait(id: string) {
		const index = this.worldState.handTraits.findIndex((f) => f.id === id);

		if (index >= 0) {
			this.worldState.handTraits.splice(index, 1);
		}
	}

	[index: string]: any; // implement string index
}
