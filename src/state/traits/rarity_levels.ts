import _rarityLevels from "./generator/names/data/rarity_levels.json";
import { ensure } from "../../components/shared/functions";

export interface IRarityLevel {
	name: string;
	display: string;
	level: number;
}

const rarities = {
	rarityLevels: _rarityLevels as Array<IRarityLevel>,
	getLevel(no: number): IRarityLevel {
		return ensure<IRarityLevel>(this.rarityLevels.find((a) => a.level === no));
	},
};

export default rarities;
