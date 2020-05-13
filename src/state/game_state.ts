import { version, tickLengthMs } from "./constants";
import { GameTabType } from "./game_tabs";
import IWorldState from "./IWorldState";
import { ingredientLevel } from "./data/ingredient_levels";

const debug = true;

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

	askForHelpMixingBasicIngredients(): void {
		this.worldState.worldFlags.initialProductionHelpCycles += 5;
	}

	canHandDeliver(): boolean {
		return (
			!this.worldState.worldFlags.isHandDeliveringBatch &&
			this.worldState.storage.handTraits.length > 0
		);
	}

	beginHandDeliverBatch() {
		this.worldState.worldFlags.isHandDeliveringBatch = true;
	}

	canVolunteerHandDeliver(): boolean {
		return (
			!this.worldState.worldFlags.isVolunteerHandDeliveringBatch &&
			this.worldState.storage.handTraits.length > 0
		);
	}

	beginVolunteerHandDeliverBatch() {
		this.worldState.worldFlags.isVolunteerHandDeliveringBatch = true;
	}

	[index: string]: any; // implement string index
}
