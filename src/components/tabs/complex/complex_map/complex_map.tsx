import React, { useContext } from "react";
import AppContext from "../../../../state/app_context";
import { Stage } from "react-konva";
import ComplexMapTiles from "./complex_map_tiles";

const ComplexMap = () => {
	const { worldState } = useContext(AppContext);
	const { complexArea } = worldState;

	return (
		<div>
			{/* need to bridge the app context inside the Konva Stage, see https://github.com/konvajs/react-konva#usage-with-react-context */}
			<AppContext.Consumer>
				{(value) => (
					<Stage
						width={complexArea.width * complexArea.tileSize}
						height={complexArea.height * complexArea.tileSize}
					>
						<AppContext.Provider value={value}>
							<ComplexMapTiles />
						</AppContext.Provider>
					</Stage>
				)}
			</AppContext.Consumer>
		</div>
	);
};

export default ComplexMap;
