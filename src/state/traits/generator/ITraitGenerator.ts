import ITrait from "../ITrait";

export interface ITraitGenerator {
	maxRarityLevel: number;
	nuanceFraction: number;
	generateSingle(): ITrait;
}
