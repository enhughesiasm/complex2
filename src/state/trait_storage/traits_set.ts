import rarities, { IRarityLevel } from "./../traits/rarity_levels";

export interface ITraitsSet {
	amount: number;
	rarity: IRarityLevel;
}

export default class TraitsSet implements ITraitsSet {
	amount: number = 0;
	rarity: IRarityLevel = rarities.rarityLevels[0];
}
