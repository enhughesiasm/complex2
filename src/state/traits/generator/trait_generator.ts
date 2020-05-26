import {
	RandomNumberWeighting,
	lerp,
} from "./../../../components/shared/functions";
import rarities, { IRarityLevel } from "../rarity_levels";
import { ITraitGenerator } from "./ITraitGenerator";
import generateTraitName from "./names/generate_names";
import {
	create_guid,
	getWeightedRandomInteger,
} from "../../../components/shared/functions";
import ITrait from "../ITrait";

const rarityLevels = rarities.rarityLevels;

export default class TraitGenerator implements ITraitGenerator {
	maxRarityLevel: number = 0;
	nuanceFraction: number = 0;

	actualMaxLevel: number = Math.max(...rarityLevels.map((a) => a.level));

	generateSingle(): ITrait {
		const rarityLevel = this.getRarityLevel();

		const name = generateTraitName(rarityLevel.name, this.nuanceFraction);

		return {
			id: create_guid(),
			name: name,
			rarity: rarityLevel.level,
		};
	}

	getRarityLevel(): IRarityLevel {
		let levelNum = 99;
		let weighting = RandomNumberWeighting.PreferLowNumbers;
		let allowedMax = Math.min(this.maxRarityLevel, this.actualMaxLevel);

		if (this.maxRarityLevel > this.actualMaxLevel) {
			// bias the weighting in favour of higher numbers
			weighting = lerp(
				Math.min(this.maxRarityLevel, this.actualMaxLevel * 3),
				this.actualMaxLevel,
				this.actualMaxLevel * 3,
				RandomNumberWeighting.PreferLowNumbers,
				RandomNumberWeighting.PreferHighNumbers
			);
		}

		levelNum = getWeightedRandomInteger(0, allowedMax, weighting);

		return rarityLevels.find((l) => l.level === levelNum) || rarityLevels[0];
	}
}
