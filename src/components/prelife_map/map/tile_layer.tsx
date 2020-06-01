import React, { useContext } from "react";
import AppContext from "../../../state/app_context";

import { Rect, Layer } from "react-konva";
import Tile from "./tile";

const TileLayer: React.FC = () => {
	const { worldState } = useContext(AppContext);

	const { prelifeMap } = worldState;
	console.log(prelifeMap.tiles);

	return (
		<Layer>
			{prelifeMap.tiles.map((column, i) => (
				<React.Fragment key={`column${i}`}>
					{prelifeMap.tiles[i].map((tile, j) => (
						<Tile
							x={i * prelifeMap.TILE_SIZE}
							y={j * prelifeMap.TILE_SIZE}
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
