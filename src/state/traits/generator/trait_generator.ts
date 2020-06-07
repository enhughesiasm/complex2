import {
	RandomNumberWeighting,
	lerp,
	chooseRandomElement,
	clamp,
} from "./../../../components/shared/functions";
import rarities, { IRarityLevel } from "../rarity_levels";
import { ITraitGenerator } from "./ITraitGenerator";
import generateTraitName from "./names/generate_names";
import {
	create_guid,
	getWeightedRandomInteger,
} from "../../../components/shared/functions";
import ITrait from "../ITrait";
import PlayerAttributes from "../../player_attributes";
import TraitsSet from "../../trait_storage/traits_set";

const rarityLevels = rarities.rarityLevels;

function assembleSingle(l: IRarityLevel, nuanceFraction: number): ITrait {
	const type = chooseRandomElement(
		rarityLevels.filter((a) => a.level <= l.level)
	).name;

	const name = generateTraitName(type, nuanceFraction);

	return {
		id: create_guid(),
		name: name,
		rarity: l.level,
	};
}

export default class TraitGenerator implements ITraitGenerator {
	maxPossibleLevel: number = Math.max(...rarityLevels.map((a) => a.level));

	generateSingle(attributes: PlayerAttributes): ITrait {
		const rarityLevel = this.chooseTraitRarity(attributes.unlockedRarityLevel);
		return assembleSingle(rarityLevel, attributes.rarityIncreaseBonusChance);
	}

	generateSingleAtSpecificLevel(
		level: number,
		attributes: PlayerAttributes
	): ITrait {
		const rarityLevel = rarities.getLevel(level);
		return assembleSingle(rarityLevel, attributes.rarityIncreaseBonusChance);
	}

	generateMany(
		ingredients: TraitsSet,
		attributes: PlayerAttributes,
		maxPermittedLevel: number
	): TraitsSet {
		const traits = new TraitsSet();

		const baseTransferChance = clamp(
			1 - attributes.rarityIncreaseBonusChance,
			0,
			1
		);

		ingredients.getIterator().forEach((i) => {
			if (i.level <= maxPermittedLevel) {
				// for now 1 ingredient = 1 trait at that level
				if (i.level === 0) {
					traits.set(i.level, i.amount);
				} else {
					// distribute higher amounts of ingredients across all lower levels
					const totalToDistribute = ingredients.get(i.level);

					if (totalToDistribute > 0) {
						let amountRemaining = totalToDistribute;
						let transferChance = baseTransferChance;

						for (let l = 0; l < i.level; l++) {
							transferChance *= 0.9;

							let a = Math.floor(amountRemaining * transferChance);

							traits.change(l, a);
							amountRemaining -= a;
						}

						traits.set(i.level, amountRemaining);
					}
				}
			}
		});

		// over time this will push more and more traits to be rarer, which is exactly what we want
		// (i.e. it's NOT a set fraction moves from n to n+1 each time)
		// this is both lazier and more generous to the player which is fine :)
		// (this approach only works with large numbers, but that's fine too as we'll only have high
		// rarities being made at large numbers.)
		// mostly, this approach will scale even at stupidly high numbers and avoids
		// calculating beta/gamma/F probability distributions 😅

		// maxRarityLevel can go higher than maxRarityLevel (i.e. should be renamed 😂)
		// so we iterate that many times to give higher chances for traits to be rarer
		for (let i = 0; i < attributes.unlockedRarityLevel; i++) {
			traits.moveFractionUpLevel(
				attributes.rarityIncreaseFlatRate,
				attributes.rarityIncreaseBonusChance,
				Math.min(attributes.unlockedRarityLevel, maxPermittedLevel) // there's still a cap
			);
		}

		return traits;
	}

	chooseTraitRarity(currentPlayerMax: number): IRarityLevel {
		let levelNum = 99;
		let weighting = RandomNumberWeighting.PreferLowNumbers;
		let allowedMax = Math.min(currentPlayerMax, this.maxPossibleLevel);

		if (currentPlayerMax > this.maxPossibleLevel) {
			// bias the weighting in favour of higher numbers
			weighting = lerp(
				Math.min(currentPlayerMax, this.maxPossibleLevel * 3),
				this.maxPossibleLevel,
				this.maxPossibleLevel * 3,
				RandomNumberWeighting.PreferLowNumbers,
				RandomNumberWeighting.PreferHighNumbers
			);
		}

		levelNum = getWeightedRandomInteger(0, allowedMax, weighting);

		return rarityLevels.find((l) => l.level === levelNum) ?? rarityLevels[0];
	}
}
