import { version, tickLengthMs } from './constants';
import { GameTabs } from './IGameState';
import IGameState from './IGameState';
import IWorldState from './IWorldState';
import generateTrait from './traits/generator/generate_trait';

export default class GameState implements IGameState {
	constructor(worldState: IWorldState) {
		this.worldState = worldState;
	}

	debug: boolean = false;
	version: string = version;
	tickLengthMs: number = tickLengthMs;
	visibleTab: GameTabs = GameTabs.HOME;
	patchNotesActive: boolean = false;
	worldState: IWorldState;

	togglePatchNotes = () => {
		this.patchNotesActive = !this.patchNotesActive;
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
