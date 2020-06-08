import React, { useContext } from "react";
import { Stage } from "react-konva";
import TileLayer from "./map/tile_layer";
import AppContext from "../../state/app_context";
import EmployeeLayer from "./map/employee_layer";
import StatusBar from "./map/status_bar";
import ResourcesLayer from "./map/resources_layer";

const PrelifeMapTab: React.FC = () => {
	const { worldState } = useContext(AppContext);
	const { prelifeMap } = worldState;

	// https://github.com/facebook/react/issues/13336#issuecomment-414709155

	return (
		<div>
			<h2 className="subtitle">A Map of Part of the Prelife</h2>

			{/* need to bridge the app context inside the Konva Stage, see https://github.com/konvajs/react-konva#usage-with-react-context */}
			<AppContext.Consumer>
				{(value) => (
					<Stage
						width={prelifeMap.MAP_WIDTH * prelifeMap.TILE_SIZE}
						height={
							prelifeMap.MAP_HEIGHT * prelifeMap.TILE_SIZE +
							prelifeMap.STATUS_HEIGHT
						}
					>
						<AppContext.Provider value={value}>
							<StatusBar />
							<TileLayer />
							<ResourcesLayer />
							<EmployeeLayer />
						</AppContext.Provider>
					</Stage>
				)}
			</AppContext.Consumer>
		</div>
	);
};

export default PrelifeMapTab;
