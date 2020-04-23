import { version, tickLengthMs } from "./constants";
import { GameTabs } from "./game_tabs";
import IWorldState from "./IWorldState";
import generateTrait from "./traits/generator/generate_trait";

const debug = true;

// export interface IGameState {
// 	debug: boolean;
// 	version: string;

// 	worldState: IWorldState;

// 	tickLengthMs: number;

// 	activeTab: GameTabs;
// 	patchNotesActive: boolean;

// 	changeActiveTab(tab: GameTabs): void;

// 	areSurroundingsUnlocked(): boolean;

// 	handProduceTrait(): void;
// 	handDeliverTrait(id: string): void;

// 	gatherBasicIngredients(): void;
// 	isGatheringBasicIngredients(): boolean;

// 	[index: string]: any; // string index
// }

export default class GameState {
	constructor(worldState: IWorldState) {
		this.worldState = worldState;
	}

	gatherBasicIngredients(): void {
		if (this.worldState.worldFlags.isGatheringBasicIngredients) {
			console.error("trying to gather basics twice!");
			return;
		}

		this.worldState.worldFlags.isGatheringBasicIngredients = true;
		this.worldState.worldFlags.manualGatherCount++;
	}
	isGatheringBasicIngredients(): boolean {
		return this.worldState.worldFlags.isGatheringBasicIngredients;
	}
	askForHelpGatheringBasicIngredients(): void {
		this.worldState.worldFlags.manualGatherHelpCycles += 5;
	}

	debug: boolean = debug;
	activeTab: GameTabs = !debug ? GameTabs.HANDS : GameTabs.HANDS;

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
		return (
			this.worldState.totalTraitsProduced > 0 ||
			this.worldState.storage.handTraits.length > 0
		);
	}

	handMixIngredients(): void {
		if (this.worldState.worldFlags.isHandMixingIngredients) {
			console.error("trying to mix ingredients twice!");
			return;
		}

		this.worldState.worldFlags.isHandMixingIngredients = true;
	}

	isHandMixingIngredients(): boolean {
		return this.worldState.worldFlags.isHandMixingIngredients;
	}

	handDeliverTrait(id: string) {
		const index = this.worldState.storage.handTraits.findIndex(
			(f) => f.id === id
		);

		if (index >= 0) {
			this.worldState.storage.handTraits.splice(index, 1);
		}
	}

	[index: string]: any; // implement string index
}
