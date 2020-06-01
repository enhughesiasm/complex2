import { MapTileType } from "./map_tile_types";

export default class MapTile {
	type = MapTileType.GRASS;
	explored = false;

	constructor(type: MapTileType) {
		this.type = type;
	}

	setType(type: MapTileType) {
		this.type = type;
	}
}
