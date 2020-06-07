import { MapTileType } from "./map_tile_types";
import WorldState from "../world_state";
import { GameTabType } from "../game_tabs";
import MapTile from "./map_tile";
import { generateMap } from "./generate_map";
import { ensure } from "../../components/shared/functions";

export enum Direction {
	N,
	S,
	E,
	W,
	NW,
	NE,
	SW,
	SE,
	NONE,
}

/** holds data about the actual world */
export default class PrelifeMap {
	render: boolean = false;

	tiles: MapTile[][];

	readonly TILE_SIZE: number = 64;
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

	getResourceTile(level: number): MapTile {
		const tiles = this.tiles.flat().filter((a) => a.resources === level);

		if (tiles.length === 1) return tiles[0];

		// don't hide the bug elsewhere that's causing this
		throw new Error(`Can't find tile with resource level ${level}`);
	}

	getNextTileBetween(from: MapTile, to: MapTile) {
		const dir: Direction = this.getDirectionBetweenTwoTiles(from, to);

		switch (dir) {
			case Direction.NONE:
				return from;
			case Direction.N:
				return this.tiles[from.position[0]][from.position[1] - 1];
			case Direction.NE:
				return this.tiles[from.position[0] + 1][from.position[1] - 1];
			case Direction.E:
				return this.tiles[from.position[0] + 1][from.position[1]];
			case Direction.SE:
				return this.tiles[from.position[0] + 1][from.position[1] + 1];
			case Direction.S:
				return this.tiles[from.position[0]][from.position[1] + 1];
			case Direction.SW:
				return this.tiles[from.position[0] - 1][from.position[1] + 1];
			case Direction.W:
				return this.tiles[from.position[0] - 1][from.position[1]];
			case Direction.NW:
				return this.tiles[from.position[0] - 1][from.position[1] - 1];
		}
	}

	getDirectionBetweenTwoTiles(origin: MapTile, dest: MapTile): Direction {
		if (origin.position[0] < dest.position[0]) {
			// E
			if (origin.position[1] < dest.position[1]) {
				// S
				return Direction.SE;
			} else if (origin.position[1] > dest.position[1]) {
				// N
				return Direction.NE;
			} else {
				// just E
				return Direction.E;
			}
		} else if (origin.position[0] > dest.position[0]) {
			// W
			if (origin.position[1] < dest.position[1]) {
				// S
				return Direction.SW;
			} else if (origin.position[1] > dest.position[1]) {
				// N
				return Direction.NW;
			} else {
				// just W
				return Direction.W;
			}
		} else {
			// neither E nor W
			if (origin.position[1] < dest.position[1]) {
				// S
				return Direction.S;
			} else if (origin.position[1] > dest.position[1]) {
				// N
				return Direction.N;
			} else {
				// tiles are the same
				return Direction.NONE;
			}
		}
	}
}
