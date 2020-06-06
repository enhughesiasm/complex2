import React, { useContext } from "react";
import AppContext from "../../../state/app_context";

import { Rect, Layer } from "react-konva";

const StatusBar: React.FC = () => {
	const { worldState } = useContext(AppContext);

	const { prelifeMap } = worldState;

	return (
		<Layer>
			<Rect
				width={prelifeMap.MAP_WIDTH * prelifeMap.TILE_SIZE}
				height={prelifeMap.STATUS_HEIGHT}
				fill="lightgray"
				x={0}
				y={prelifeMap.MAP_HEIGHT * prelifeMap.TILE_SIZE}
			/>
		</Layer>
	);
};

export default StatusBar;
