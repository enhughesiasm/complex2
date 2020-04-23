import { ingredientLevel } from "./../data/ingredient_levels";

// export interface IInventory {
// 	ingredients: Map<string, number>;
// 	materials: Map<string, number>;

// 	getIngredientAmount(level: ingredientLevel): number;
// 	setIngredientAmount(level: ingredientLevel, amount: number): void;
// }

export default class Inventory {
	ingredients: Map<string, number>;
	materials: Map<string, number>;

	constructor() {
		this.ingredients = new Map<string, number>();
		this.materials = new Map<string, number>();

		for (let i of Object.keys(ingredientLevel)) {
			this.ingredients.set(
				i as ingredientLevel,
				i === ingredientLevel.Basic ? 0 : 0
			);
		}
	}

	getTotalIngredientCount(): number {
		let total = 0;
		this.ingredients.forEach((i) => (total += i.valueOf()));
		return total;
	}

	getIngredientAmount(level: ingredientLevel): number {
		return this.ingredients.get(level) || 0;
	}

	setIngredientAmount(level: ingredientLevel, amount: number): void {
		this.ingredients.set(level, amount);
	}
}
