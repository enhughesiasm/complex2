import { IBuilding } from "./building";
import { BuildingTypes } from "./building_types";

import ghost from "../../../resources/images/buildings/b_test_ghost.png";
import image from "../../../resources/images/buildings/b_test.png";

export default class Building_Test implements IBuilding {
	type: BuildingTypes = BuildingTypes.TEST;
	displayName: string = "Test Site";
	icon: string = "industry";
	baseCost: number = 3;
	imageGhost: string = ghost;
	image: string = image;
	buildable: boolean = true;
}
