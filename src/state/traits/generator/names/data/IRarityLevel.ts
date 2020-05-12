import _rarityLevels from "./../rarity_levels.json";

export interface IRarityLevel {
	name: string;
	level: number;
}

const rarityLevels = _rarityLevels as Array<IRarityLevel>;

export default rarityLevels;
