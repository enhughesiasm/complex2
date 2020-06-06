import { MapTileType } from "./map_tile_types";
import WorldState from "../world_state";
import { GameTabType } from "../game_tabs";
import MapTile from "./map_tile";
import { generateMap } from "./generate_map";
import { ensure } from "../../components/shared/functions";

export enum direction {
	N,
	S,
	E,
	W,
	NW,
	NE,
	SW,
	SE,
}

/** holds data about the actual world */
export default class PrelifeMap {
	render: boolean = false;

	tiles: MapTile[][];

	readonly TILE_SIZE: number = 32;
	readonly MAP_WIDTH: number;
	readonly MAP_HEIGHT: number;
	readonly STATUS_HEIGHT: number = 50;

	readonly SHOP_POSITION: [number, number];
	readonly COMPLEX_POSITION: [number, number];

	constructor() {
		this.tiles = generateMap(this.TILE_SIZE);

		this.MAP_WIDTH = this.tiles[0].length;
		this.MAP_HEIGHT = this.tiles.length;

		let sp: [number, number] = [0, 0],
			cp: [number, number] = [0, 0];

		let maxCharCode = 0;

		this.tiles.forEach((col) =>
			col.forEach((t) => {
				if (t.type === MapTileType.SHOP) {
					sp = t.position;
				} else if (t.type === MapTileType.COMPLEX) {
					cp = t.position;
				}

				if (t.routeCode !== ".") {
					maxCharCode = Math.max(maxCharCode, t.routeCode.charCodeAt(0));
				}
			})
		);

		this.tiles.forEach((col) =>
			col.forEach((t) => {
				if (t.routeCode !== ".") {
					const charCode = t.routeCode.charCodeAt(0);

					if (charCode > 65) {
						// A
						// get earlier tile and set to prevTile
						// if this fails, there's a data error in defining the map route
						// which should include a route from A to B to C, etc.
						t.prevTileOnRoute = ensure(
							this.tiles
								.flat()
								.find((a) => a.routeCode.charCodeAt(0) === charCode - 1)
						);
					}
					if (charCode < maxCharCode) {
						// highest code on route
						// get next tile and set to prevTile
						t.nextTileOnRoute = ensure(
							this.tiles
								.flat()
								.find((a) => a.routeCode.charCodeAt(0) === charCode + 1)
						);
					}
				}
			})
		);

		this.SHOP_POSITION = sp;
		this.COMPLEX_POSITION = cp;
	}

	update(worldState: WorldState) {
		this.render = worldState.activeTab === GameTabType.MAP;
	}

	getTile(pos: [number, number]): MapTile {
		return this.tiles[pos[0]][pos[1]];
	}

	getShopTile(): MapTile {
		return this.tiles[this.SHOP_POSITION[0]][this.SHOP_POSITION[1]];
	}

	getComplexTile(): MapTile {
		return this.tiles[this.COMPLEX_POSITION[0]][this.COMPLEX_POSITION[1]];
	}

	// /** returns the edge position between two adjacent tiles, between [0,0] and [100,100], where [50,50] is the exact tile centre */
	// getSubDestinationBetween(origin: MapTile, dest: MapTile): [number, number] {
	// 	const dir = this.getDirectionBetweenTwoTiles(origin, dest);

	// 	switch (dir) {
	// 		case direction.N:
	// 			return [50, 0]; // top centre
	// 		case direction.NE:
	// 			return [100, 0]; // top right
	// 		case direction.E:
	// 			return [100, 50]; // middle right
	// 		case direction.SE:
	// 			return [100, 100]; // bottom right
	// 		case direction.S:
	// 			return [50, 100]; // bottom middle
	// 		case direction.SW:
	// 			return [0, 100]; // bottom left
	// 		case direction.W:
	// 			return [0, 50]; // middle left
	// 		case direction.NW:
	// 			return [0, 0];
	// 		default:
	// 			// if origin and dest are the same
	// 			return [50, 50];
	// 	}
	// }

	getDirectionBetweenTwoTiles(
		origin: MapTile,
		dest: MapTile
	): direction | undefined {
		if (origin.position[0] < dest.position[0]) {
			// E
			if (origin.position[1] < dest.position[1]) {
				// S
				return direction.SE;
			} else if (origin.position[1] > dest.position[1]) {
				// N
				return direction.NE;
			} else {
				// just E
				return direction.E;
			}
		} else if (origin.position[0] > dest.position[0]) {
			// W
			if (origin.position[1] < dest.position[1]) {
				// S
				return direction.SW;
			} else if (origin.position[1] > dest.position[1]) {
				// N
				return direction.NW;
			} else {
				// just W
				return direction.W;
			}
		} else {
			// neither E nor W
			if (origin.position[1] < dest.position[1]) {
				// S
				return direction.S;
			} else if (origin.position[1] > dest.position[1]) {
				// N
				return direction.N;
			} else {
				// tiles are the same
				return undefined;
			}
		}
	}
}
