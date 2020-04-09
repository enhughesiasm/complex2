import {
	RandomNumberWeighting,
	lerp,
} from './../../../components/shared/functions';
import { IRarityLevel } from './names/data/IRarityLevel';
import { ITraitGenerator } from './../ITraitGenerator';
import ITrait from '../ITrait';
import _rarityLevels from './names/rarity_levels.json';
import generateTraitName from './names/generate_names';
import {
	create_guid,
	getWeightedRandomInteger,
} from '../../../components/shared/functions';

const rarityLevels = _rarityLevels as Array<IRarityLevel>;
const actualMaxLevels = Math.max(...rarityLevels.map((a) => a.level));

export default function generateTrait(generator: ITraitGenerator): ITrait {
	const rarityLevel = getRarityLevel(generator);

	const name = generateTraitName(rarityLevel.name, generator.nuanceFraction);

	return {
		id: create_guid(),
		name: name,
		rarity: rarityLevel.level,
	};
}

function getRarityLevel(generator: ITraitGenerator): IRarityLevel {
	let levelNum = 99;
	let weighting = RandomNumberWeighting.PreferLowNumbers;
	let allowedMax = Math.min(generator.maxRarityLevel, actualMaxLevels);

	if (generator.maxRarityLevel > actualMaxLevels) {
		// bias the weighting in favour of higher numbers
		weighting = lerp(
			Math.min(generator.maxRarityLevel, actualMaxLevels * 3),
			actualMaxLevels,
			actualMaxLevels * 3,
			RandomNumberWeighting.PreferLowNumbers,
			RandomNumberWeighting.PreferHighNumbers
		);
	}

	levelNum = getWeightedRandomInteger(0, allowedMax, weighting);

	return rarityLevels.find((l) => l.level === levelNum) || rarityLevels[0];
}

export function bulkGenerateTraits() {}
