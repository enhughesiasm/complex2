import React, { useContext } from "react";
import AppContext from "../../../../state/app_context";
import InitialStorage from "./initial_storage/initial_storage";
import InitialInTransit from "./initial_in_transit";

const Surroundings: React.FC = () => {
	const { gameState, worldState } = useContext(AppContext);

	return (
		<div className="column">
			<InitialStorage />
			<InitialInTransit />
		</div>
	);
};

export default Surroundings;
