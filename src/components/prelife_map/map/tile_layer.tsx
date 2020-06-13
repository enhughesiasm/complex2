import React, { useContext } from "react";
import AppContext from "../../../state/app_context";

import { Layer } from "react-konva";
import Tile from "./tile";

const TileLayer: React.FC = () => {
	const { worldState } = useContext(AppContext);

	const { prelifeMap } = worldState;

	return (
		<Layer>
			{prelifeMap.tiles.map((col, colNo) => (
				<React.Fragment key={`col${colNo}`}>
					{prelifeMap.tiles[colNo].map((tile, rowNo) => (
						<Tile
							key={rowNo * prelifeMap.MAP_WIDTH + colNo}
							x={colNo * prelifeMap.TILE_SIZE}
							y={rowNo * prelifeMap.TILE_SIZE}
							size={prelifeMap.TILE_SIZE}
							tile={tile}
						/>
					))}
				</React.Fragment>
			))}
		</Layer>
	);
};

export default TileLayer;
