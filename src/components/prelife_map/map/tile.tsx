import React, { useState, useContext } from "react";
import { Rect, Text } from "react-konva";
import MapTile from "../../../state/prelife_map/map_tile";
import { MapTileType } from "../../../state/prelife_map/map_tile_types";
import AppContext from "../../../state/app_context";
import rarities from "../../../state/traits/rarity_levels";

export interface ITileProps {
	tile: MapTile;
	size: number;
	x: number;
	y: number;
}

const Tile: React.FC<ITileProps> = ({ tile, size, x, y }) => {
	let colour = "hotpink";
	let stroke = "black";
	let strokeWidth = 0;

	const { worldState } = useContext(AppContext);
	const { prelifeMap: map } = worldState;

	switch (tile.type) {
		case MapTileType.CITY:
			colour = "orange";
			strokeWidth = 2;
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
			colour = "purple";
			stroke = "yellow";
			strokeWidth = 2;
			break;
		case MapTileType.ROAD:
			colour = "brown";
			strokeWidth = 1;
			break;
		case MapTileType.COMPLEX:
			colour = "orange";
			stroke = "purple";
			strokeWidth = 2;
			break;
		case MapTileType.HILL:
			colour = "lightgreen";
			break;
	}

	if (!tile.explored) {
		colour = "black";
		strokeWidth = 0;
	}

	const [hover, setHover] = useState(false);

	return (
		<>
			<Rect
				width={size - strokeWidth / 2}
				height={size - strokeWidth / 2}
				offsetX={0}
				x={x}
				y={y}
				fill={colour}
				stroke={stroke}
				strokeWidth={strokeWidth}
				onMouseOver={() => setHover(true)}
				onMouseOut={() => setHover(false)}
			/>
			{hover && tile.resources >= 0 && (
				<Text
					fontFamily="Nunito"
					fill="red"
					fontSize={18}
					fontStyle="bold"
					x={20}
					y={map.MAP_HEIGHT * map.TILE_SIZE + map.STATUS_HEIGHT / 2 - 18 / 2}
					text={
						"Contains " +
						rarities.getLevel(tile.resources).ingredientDisplay +
						" ingredients"
					}
				></Text>
			)}
		</>
	);
};

export default Tile;
