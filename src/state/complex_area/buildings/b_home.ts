import { IBuilding } from "./building";
import { BuildingTypes } from "./building_types";

import ghost from "../../../resources/images/buildings/b_home_ghost.png";
import image from "../../../resources/images/buildings/b_home.png";

export default class Building_Home implements IBuilding {
	type: BuildingTypes = BuildingTypes.HOME;
	displayName: string = "House";
	icon: string = "home";
	baseCost: number = 0;
	imageGhost: string = ghost;
	image: string = image;
	buildable: boolean = false;
}
