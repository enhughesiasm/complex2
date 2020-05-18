import { version, tickLengthMs } from "./constants";
import { GameTabType } from "./game_tabs";
import { ingredientLevel } from "./data/ingredient_levels";
import WorldState from "./world_state";

export default class GameState {
	version: string = version;
	tickLengthMs: number = tickLengthMs;

	patchNotesActive: boolean = false;

	// state
	worldState: WorldState;

	constructor(worldState: WorldState) {
		this.worldState = worldState;
	}

	spendFavours(amount: number): boolean {
		if (this.worldState.favours >= amount) {
			this.worldState.favours -= amount;
			this.worldState.favoursSpent += amount;
			return true;
		}
		console.error(
			`Tried to spend ${amount} favours, only have ${this.worldState.favours}. Check the stack - missing a check somewhere!`
		);
		return false;
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
		this.worldState.worldFlags.manualGatherHelpCycles += this.worldState.playerAttributes.manualGatherHelpAmount;

		this.worldState.playerAttributes.manualGatherHelpAmount += 1;
		this.worldState.playerAttributes.manualGatherHelpAmount = Math.min(
			this.worldState.playerAttributes.manualGatherHelpAmount,
			10
		);
	}

	togglePatchNotes = () => {
		this.patchNotesActive = !this.patchNotesActive;
	};

	changeActiveTab = (tab: GameTabType) => {
		this.worldState.activeTab = tab;
	};

	areSurroundingsUnlocked() {
		return (
			this.worldState.totalTraitsProduced > 0 ||
			this.worldState.storage.initialStorageTraits.length > 0
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
		this.worldState.worldFlags.initialProductionHelpCycles += this.worldState.playerAttributes.initialProductionHelpAmount;

		this.worldState.playerAttributes.initialProductionHelpAmount += 1;
		this.worldState.playerAttributes.initialProductionHelpAmount = Math.min(
			this.worldState.playerAttributes.initialProductionHelpAmount,
			10
		);
	}

	canHandDeliver(): boolean {
		return (
			!this.worldState.worldFlags.isHandDeliveringBatch &&
			this.worldState.storage.initialStorageTraits.length > 0
		);
	}

	beginHandDeliverBatch() {
		this.worldState.worldFlags.isHandDeliveringBatch = true;
	}

	canVolunteerHandDeliver(): boolean {
		return (
			!this.worldState.worldFlags.isVolunteerHandDeliveringBatch &&
			this.worldState.storage.initialStorageTraits.length > 0
		);
	}

	beginVolunteerHandDeliverBatch() {
		this.worldState.worldFlags.isVolunteerHandDeliveringBatch = true;
	}

	canExpandInitialStorage(): boolean {
		return (
			this.worldState.favours >= this.getCost_ExpandInitialStorage() &&
			this.worldState.storage.canExpandInitialStorage()
		);
	}

	getCost_ExpandInitialStorage(): number {
		return this.worldState.storage.currentMaxInitialStorageSize;
	}

	expandInitialStorage(): void {
		if (this.spendFavours(this.getCost_ExpandInitialStorage())) {
			this.worldState.storage.expandInitialStorage();
		}
	}

	unlockEmployees(): void {
		if (this.worldState.employees.unlocked) {
			console.error("Unlocking employees twice!");
			return;
		}

		this.worldState.employees.unlocked = true;
	}

	[index: string]: any; // implement string index
}
