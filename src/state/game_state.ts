import { version, tickLengthMs } from "./constants";
import { GameTabType } from "./game_tabs";
import IWorldState from "./IWorldState";
import generateTrait from "./traits/generator/generate_trait";
import { ingredientLevel } from "./data/ingredient_levels";
import ITrait from "./traits/ITrait";

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
	canGatherBasicIngredients(): boolean {
		return (
			!this.worldState.worldFlags.isGatheringBasicIngredients &&
			!this.worldState.worldFlags.isHandDeliveringBatch
		);
	}
	askForHelpGatheringBasicIngredients(): void {
		this.worldState.worldFlags.manualGatherHelpCycles += 5;
	}

	debug: boolean = debug;
	activeTab: GameTabType = !debug ? GameTabType.HANDS : GameTabType.HANDS;

	version: string = version;
	tickLengthMs: number = tickLengthMs;

	patchNotesActive: boolean = false;
	worldState: IWorldState;

	togglePatchNotes = () => {
		this.patchNotesActive = !this.patchNotesActive;
	};

	changeActiveTab = (tab: GameTabType) => {
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

		this.worldState.inventory.changeIngredientAmount(ingredientLevel.Basic, -1);
		this.worldState.worldFlags.isHandMixingIngredients = true;
	}

	canHandMixIngredients(): boolean {
		return (
			!this.isHandMixingIngredients() &&
			!this.worldState.worldFlags.isHandDeliveringBatch &&
			this.worldState.inventory.getIngredientAmount(ingredientLevel.Basic) > 0
		);
	}

	isHandMixingIngredients(): boolean {
		return this.worldState.worldFlags.isHandMixingIngredients;
	}

	canHandDeliver(): boolean {
		return !this.worldState.worldFlags.isHandDeliveringBatch;
	}

	beginHandDeliverBatch() {
		this.worldState.worldFlags.isHandDeliveringBatch = true;
	}

	[index: string]: any; // implement string index
}
