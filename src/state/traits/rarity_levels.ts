import _rarityLevels from "./generator/names/data/rarity_levels.json";
import { ensure } from "../../components/shared/functions";

export interface IRarityLevel {
	name: string;
	display: string;
	level: number;
}

/** a helper object around the JSON data which defines the rarity levels */
const rarities = {
	rarityLevels: _rarityLevels as Array<IRarityLevel>,
	maxLevel: Math.max(..._rarityLevels.map((a) => a.level)),
	getLevel(no: number): IRarityLevel {
		return ensure<IRarityLevel>(this.rarityLevels.find((a) => a.level === no));
	},
};

export default rarities;
