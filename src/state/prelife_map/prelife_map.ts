import { MapTileType } from "./map_tile_types";
import WorldState from "../world_state";
import { GameTabType } from "../game_tabs";
import MapTile from "./map_tile";
import { generateMap } from "./generate_map";

/** holds data about the actual world */
export default class PrelifeMap {
	render: boolean = false;

	tiles: MapTile[][];

	readonly TILE_SIZE: number = 32;
	readonly MAP_WIDTH: number = 20;
	readonly MAP_HEIGHT: number = 20;

	constructor() {
		this.tiles = generateMap(this.MAP_WIDTH, this.MAP_HEIGHT);
	}

	update(worldState: WorldState) {
		this.render = worldState.activeTab === GameTabType.MAP;
	}
}
