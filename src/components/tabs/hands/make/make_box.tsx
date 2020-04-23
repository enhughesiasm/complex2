import React, { useContext } from "react";
import AppContext from "../../../../state/app_context";

import InitialIngredients from "./initial_ingredients";
import InitialProduction from "./initial_production";

const MakeBox: React.FC = () => {
	const { gameState, worldState } = useContext(AppContext);

	return (
		<div className="content">
			<InitialIngredients />

			{worldState.inventory.getTotalIngredientCount() > 0 && (
				<InitialProduction />
			)}
		</div>
	);
};

export default MakeBox;
