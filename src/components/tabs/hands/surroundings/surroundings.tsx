import React, { useContext } from "react";
import AppContext from "../../../../state/app_context";
import HandStorage from "./hand_storage/hand_storage";

const Surroundings: React.FC = () => {
	const { gameState, worldState } = useContext(AppContext);

	return (
		<div className="column">
			<HandStorage />
		</div>
	);
};

export default Surroundings;
