import React from "react";
import InitialStorage from "./initial_storage/initial_storage";
import InitialInTransit from "./initial_in_transit";

const Surroundings: React.FC = () => {
	return (
		<div className="column">
			<InitialStorage />
			<InitialInTransit />
		</div>
	);
};

export default Surroundings;
