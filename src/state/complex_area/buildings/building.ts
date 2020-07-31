import { BuildingTypes } from "./building_types";

export interface IBuilding {
	type: BuildingTypes;
	displayName: string;
	icon: string;
	baseCost: number;
	image: string;
	imageGhost: string;
	buildable: boolean;
}
