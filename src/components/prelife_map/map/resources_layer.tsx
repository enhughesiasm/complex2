import React, { useContext } from "react";
import AppContext from "../../../state/app_context";

import { Circle, Layer } from "react-konva";
import styleVariables from "../../../resources/styles/styles";

const ResourcesLayer: React.FC = () => {
	const { worldState } = useContext(AppContext);

	const { prelifeMap } = worldState;

	return (
		<Layer>
			{prelifeMap.tiles
				.flat()
				.filter((a) => a.resources >= 0 && a.explored)
				.map((tile) => (
					<Circle
						key={tile.position[0] * prelifeMap.MAP_WIDTH + tile.position[1]}
						x={
							tile.position[0] * prelifeMap.TILE_SIZE + prelifeMap.TILE_SIZE / 2
						}
						y={
							tile.position[1] * prelifeMap.TILE_SIZE + prelifeMap.TILE_SIZE / 2
						}
						radius={prelifeMap.TILE_SIZE / 4}
						fill={styleVariables[`rarity${tile.resources}`]}
					/>
				))}
		</Layer>
	);
};

export default ResourcesLayer;
