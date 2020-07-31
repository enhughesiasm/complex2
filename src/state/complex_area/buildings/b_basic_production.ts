import { IBuilding } from "./building";
import { BuildingTypes } from "./building_types";

import ghost from "../../../resources/images/buildings/b_basic_production_ghost.png";
import image from "../../../resources/images/buildings/b_basic_production.png";

export default class Building_Basic_Production implements IBuilding {
	type: BuildingTypes = BuildingTypes.BASIC_PRODUCTION;
	displayName: string = "Production Area";
	icon: string = "campground";
	baseCost: number = 0;
	imageGhost: string = ghost;
	image: string = image;
	buildable: boolean = false;
}
