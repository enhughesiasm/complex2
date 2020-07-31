import { BuildingTypes } from "./buildings/building_types";
import { COMPLEX_MAP_TILE_SIZE } from "./../constants";
import ComplexAreaTile from "./complex_area_tile";
import { map } from "./complex_area_definition.json";
import { IBuilding } from "./buildings/building";
import all_buildings from "./buildings/all_buildings";
import { ensure, roundToNearest } from "../../components/shared/functions";
import WorldState from "../world_state";
import { buildingCostGrowthExponent } from "./../constants";

export default class ComplexArea {
	width: number = 0;
	height: number = 0;
	tileSize: number = COMPLEX_MAP_TILE_SIZE;

	tiles: ComplexAreaTile[][];
	selectedBuilding: IBuilding = ensure<IBuilding>(
		all_buildings.find((a) => a.type === BuildingTypes.NONE)
	);

	initialiseArea: Function = () => {
		let tiles: ComplexAreaTile[][] = [];

		this.width = map[0].length;
		this.height = map.length;

		for (let col = 0; col < this.width; col++) {
			tiles[col] = [];
			for (let row = 0; row < this.height; row++) {
				const initialBuilding = map[row][col];

				let buildingType = BuildingTypes.NONE;

				// only need to implement the ones that exist in the initial map
				switch (initialBuilding) {
					case ".":
						buildingType = BuildingTypes.NONE;
						break;
					case "H":
						buildingType = BuildingTypes.HOME;
						break;
					case "P":
						buildingType = BuildingTypes.BASIC_PRODUCTION;
						break;
				}

				// store positions as x,y even though we're reading them as y,x from the JSON
				tiles[col][row] = new ComplexAreaTile(
					ensure(all_buildings.find((a) => a.type === buildingType)),
					[col, row],
					this.tileSize
				);
			}
		}

		return tiles;
	};

	constructor() {
		this.tiles = this.initialiseArea();
	}

	setSelectedBuilding(buildingType: BuildingTypes) {
		this.selectedBuilding = ensure<IBuilding>(
			all_buildings.find((a) => a.type === buildingType)
		);
	}

	getBuildingCost(building: IBuilding): number {
		const currentAmount = this.tiles
			.flat()
			.filter((a) => a.building.type === building.type).length;

		const cost = Math.floor(
			building.baseCost * Math.pow(buildingCostGrowthExponent, currentAmount)
		);

		if (cost === 0) return 0;

		let orderOfMagnitude = Math.floor(Math.log10(cost));

		if (orderOfMagnitude > 2) {
			orderOfMagnitude -= 1;
			if (orderOfMagnitude > 4) {
				orderOfMagnitude -= 1;
			}
		}

		return roundToNearest(cost, Math.pow(10, orderOfMagnitude));
	}

	canBuild(building: IBuilding, worldState: WorldState): boolean {
		return worldState?.favours >= this.getBuildingCost(building);
	}

	buildBuilding(
		building: IBuilding,
		tile: ComplexAreaTile,
		worldState: WorldState
	) {
		if (building.buildable && this.canBuild(building, worldState)) {
			tile.building = building;
			worldState.spendFavours(this.getBuildingCost(building));
		}
	}
}
