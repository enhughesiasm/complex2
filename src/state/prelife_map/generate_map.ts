import { MapTileType } from "./map_tile_types";
import MapTile from "./map_tile";
import { map, route, explored, resources } from "./map_definition.json";

export function generateMap(tileSize: number): MapTile[][] {
	let tiles: MapTile[][] = [];

	const width = map[0].length;
	const height = map.length;

	for (let col = 0; col < width; col++) {
		tiles[col] = [];
		for (let row = 0; row < height; row++) {
			const typeStr = map[row][col];
			let type = MapTileType.NONE;

			switch (typeStr) {
				case ".":
					type = MapTileType.GRASS;
					break;
				case "M":
					type = MapTileType.MOUNTAIN;
					break;
				case "R":
					type = MapTileType.RIVER;
					break;
				case "S":
					type = MapTileType.SHOP;
					break;
				case "C":
					type = MapTileType.COMPLEX;
					break;
				case "D":
					type = MapTileType.ROAD;
					break;
				case "O":
					type = MapTileType.CITY;
					break;
				case "H":
					type = MapTileType.HILL;
					break;
			}

			// store positions as x,y even though we're reading them as y,x from the JSON
			tiles[col][row] = new MapTile(
				type,
				[col, row],
				tileSize,
				route[row][col],
				explored[row][col] === "*",
				parseInt(resources[row][col])
			);
		}
	}

	return tiles;
}
