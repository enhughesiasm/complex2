import { MapTileType } from "./map_tile_types";
import MapTile from "./map_tile";

// TK: redo this in a much smarter way! it'll do for now...
export function generateMap(width: number, height: number): MapTile[][] {
	let tiles: MapTile[][] = [];

	for (let i = 0; i < width; i++) {
		tiles[i] = [];
		for (let j = 0; j < height; j++) {
			tiles[i][j] = new MapTile(MapTileType.GRASS);
		}
	}

	// add mountains
	for (let i = 0; i < width; i++) {
		for (let j = 0; j < height; j++) {
			if (i < 3 && j < 4) {
				tiles[i][j].type = MapTileType.MOUNTAIN;
			}
			if (i === 0) {
				tiles[i][j].type = MapTileType.MOUNTAIN;
			}
		}
	}

	tiles[3][2].type = MapTileType.RIVER;
	for (let i = 0; i < width; i++) {
		for (let j = 0; j < height; j++) {
			if (i > 3 && j == 3 && i < 17) {
				tiles[i][j].type = MapTileType.RIVER;
			}
			if (i === 16 && j > 3) {
				tiles[i][j].type = MapTileType.RIVER;
			}
		}
	}

	// add points of interest
	tiles[1][2].type = MapTileType.COMPLEX;
	tiles[11][4].type = MapTileType.SHOP;

	return tiles;
}
