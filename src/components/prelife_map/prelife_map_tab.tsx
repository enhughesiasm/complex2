import React, { useContext } from "react";
import { Layer, Rect, Stage, Group } from "react-konva";
import Konva from "konva";
import TileLayer from "./map/tile_layer";
import AppContext from "../../state/app_context";

const PrelifeMapTab: React.FC = () => {
	const { worldState } = useContext(AppContext);
	const { prelifeMap } = worldState;

	return (
		<div>
			<h2 className="subtitle">A Map of Part of the Prelife</h2>
			<Stage
				width={prelifeMap.MAP_WIDTH * prelifeMap.TILE_SIZE}
				height={prelifeMap.MAP_HEIGHT * prelifeMap.TILE_SIZE}
			>
				<TileLayer />
			</Stage>
		</div>
	);
};

export default PrelifeMapTab;
