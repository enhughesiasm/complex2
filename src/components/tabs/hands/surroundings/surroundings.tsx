import React, { useContext } from "react";
import AppContext from "../../../../state/app_context";
import HandStorage from "./hand_storage/hand_storage";
import InitialInTransit from "./initial_in_transit";

const Surroundings: React.FC = () => {
	const { gameState, worldState } = useContext(AppContext);

	return (
		<div className="column">
			<HandStorage />
			<InitialInTransit/>
		</div>
	);
};

export default Surroundings;
