import { MapTileType } from "./map_tile_types";

export default class MapTile {
	type = MapTileType.GRASS;
	size: number;
	routeCode: string;
	explored = false;
	explorationCompletion = 0;
	position: [number, number];
	resources: number = -1;

	moveSpeedFactor: number = 1;

	nextTileOnRoute?: MapTile;
	prevTileOnRoute?: MapTile;

	constructor(
		type: MapTileType,
		pos: [number, number],
		size: number,
		routeCode: string,
		explored: boolean,
		resources: number
	) {
		this.type = type;
		this.position = pos;
		this.routeCode = routeCode;
		this.size = size;
		this.explored = explored;
		this.explorationCompletion = explored ? 100 : 0;

		if (resources >= 0) {
			this.resources = resources;
		}

		switch (type) {
			case MapTileType.MOUNTAIN:
				this.moveSpeedFactor = 0.5;
				break;
			case MapTileType.RIVER:
				this.moveSpeedFactor = 0.5;
				break;
			case MapTileType.HILL:
				this.moveSpeedFactor = 0.75;
				break;
			case MapTileType.ROAD:
				this.moveSpeedFactor = 1.25;
				break;
		}
	}

	setType(type: MapTileType) {
		this.type = type;
	}

	getCoordsTopLeft(): [number, number] {
		return [this.position[0] * this.size, this.position[1] * this.size];
	}

	getCoordsCenter(): [number, number] {
		return [
			this.position[0] * this.size + Math.floor(this.size / 2),
			this.position[1] * this.size + Math.floor(this.size / 2),
		];
	}

	getCoordsRandom(): [number, number] {
		return [
			this.position[0] * this.size + Math.floor(Math.random() * this.size),
			this.position[1] * this.size + Math.floor(Math.random() * this.size),
		];
	}

	/** returns true if the tiles are in the same position */
	is(tile: MapTile | undefined): boolean {
		if (tile === undefined) return false;

		return (
			this.position[0] === tile.position[0] &&
			this.position[1] === tile.position[1]
		);
	}
}
