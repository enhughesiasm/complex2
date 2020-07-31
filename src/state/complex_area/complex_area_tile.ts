import { BuildingTypes } from "./buildings/building_types";
import { IBuilding } from "./buildings/building";
import all_buildings from "./buildings/all_buildings";
import { ensure } from "../../components/shared/functions";
export default class ComplexAreaTile {
	building: IBuilding;
	pos: [number, number];
	size: number;

	constructor(building: IBuilding, pos: [number, number], size: number) {
		this.building = building;
		this.pos = pos;
		this.size = size;
	}

	setBuilding(type: BuildingTypes) {
		this.building = ensure(all_buildings.find((a) => a.type === type));
	}
}
