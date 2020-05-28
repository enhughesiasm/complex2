import TraitsSet from "../trait_storage/traits_set";
import rarities from "../traits/rarity_levels";

export default class Inventory {
	ingredients: TraitsSet;
	materials: Map<string, number>; // TK actuall plan this

	constructor() {
		this.ingredients = new TraitsSet();
		this.materials = new Map<string, number>();

		for (let i of rarities.rarityLevels) {
			this.ingredients.set(i.level, 0);
		}
	}

	getTotalIngredientCount(): number {
		return this.ingredients.getTotal();
	}

	getIngredientAmount(level: number): number {
		const amount = this.ingredients.get(level);
		if (amount === null || amount === undefined)
			throw new Error("changing nonexistent level");
		return amount || 0;
	}

	setIngredientAmount(level: number, amount: number): void {
		this.ingredients.set(level, amount);
	}

	changeIngredientAmount(level: number, amount: number): void {
		this.ingredients.change(level, amount);
	}

	tryRemoveIngredients(amount: number): TraitsSet {
		return this.ingredients.removeRarestFirst(amount);
	}
}
