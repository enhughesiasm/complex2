import ITrait from "../ITrait";
import TraitsSet from "../../trait_storage/traits_set";
import PlayerAttributes from "../../player_attributes";

export interface ITraitGenerator {
	generateSingle(attributes: PlayerAttributes): ITrait;
	generateSingleAtSpecificLevel(
		level: number,
		attributes: PlayerAttributes
	): ITrait;
	generateMany(
		ingredients: TraitsSet,
		attributes: PlayerAttributes,
		maxPermittedLevel: number
	): TraitsSet;
}
