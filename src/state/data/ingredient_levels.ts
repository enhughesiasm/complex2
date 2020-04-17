export enum ingredientLevel {
	Basic = 'Basic',
	Common = 'Common',
	Uncommon = 'Uncommon',
	Rare = 'Rare',
	Special = 'Special',
	Legendary = 'Legendary',
	Secret = 'Secret',
}

export type ingredientLevelStrings = keyof typeof ingredientLevel;
