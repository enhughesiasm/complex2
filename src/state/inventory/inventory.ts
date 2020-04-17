import { ingredientLevel } from './../data/ingredient_levels';

export interface IInventory {
	ingredients: Map<string, number>;
	materials: Map<string, number>;
}

export default class Inventory implements IInventory {
	ingredients: Map<string, number>;
	materials: Map<string, number>;

	constructor() {
		this.ingredients = new Map<string, number>();
		this.materials = new Map<string, number>();

		for (let i of Object.keys(ingredientLevel)) {
			this.ingredients.set(
				i as ingredientLevel,
				i === ingredientLevel.Basic ? 5 : 0
			);
		}
	}
}
