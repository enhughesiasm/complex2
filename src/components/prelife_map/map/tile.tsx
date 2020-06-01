import React from "react";
import { Rect } from "react-konva";
import MapTile from "../../../state/prelife_map/map_tile";
import { MapTileType } from "../../../state/prelife_map/map_tile_types";

export interface ITileProps {
	tile: MapTile;
	size: number;
	x: number;
	y: number;
}

const Tile: React.FC<ITileProps> = ({ tile, size, x, y }) => {
	let colour = "hotpink";

	switch (tile.type) {
		case MapTileType.CITY:
			colour = "orange";
			break;
		case MapTileType.GRASS:
			colour = "#09AA01";
			break;
		case MapTileType.RIVER:
			colour = "#0b72ac";
			break;
		case MapTileType.MOUNTAIN:
			colour = "gray";
			break;
		case MapTileType.SHOP:
			colour = "white";
			break;
		case MapTileType.COMPLEX:
			colour = "purple";
			break;
	}

	return <Rect width={size} height={size} x={x} y={y} fill={colour}></Rect>;
};

export default Tile;
