import { IBuilding } from "./building";
import { BuildingTypes } from "./building_types";

import ghost from "../../../resources/images/buildings/b_none_ghost.png";
import image from "../../../resources/images/buildings/b_none.png";

export default class Building_None implements IBuilding {
	type: BuildingTypes = BuildingTypes.NONE;
	displayName: string = "No Building";
	icon: string = "seedling";
	baseCost: number = 0;
	imageGhost: string = ghost;
	image: string = image;
	buildable: boolean = true;
}
