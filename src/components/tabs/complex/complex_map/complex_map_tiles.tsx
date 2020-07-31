import React, { useContext } from "react";

import ComplexTile from "./complex_tile";
import { Layer } from "react-konva";
import AppContext from "../../../../state/app_context";

const ComplexMapTiles: React.FC = () => {
	const { worldState } = useContext(AppContext);

	const { complexArea } = worldState;

	return (
		<Layer>
			{complexArea.tiles.map((col, colNo) => (
				<React.Fragment key={`col${colNo}`}>
					{complexArea.tiles[colNo].map((tile, rowNo) => (
						<ComplexTile
							key={rowNo * complexArea.width + colNo}
							x={colNo * complexArea.tileSize}
							y={rowNo * complexArea.tileSize}
							size={complexArea.tileSize}
							tile={tile}
						/>
					))}
				</React.Fragment>
			))}
		</Layer>
	);
};

export default ComplexMapTiles;
