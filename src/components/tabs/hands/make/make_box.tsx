import React, { useContext } from "react";
import AppContext from "../../../../state/app_context";

import InitialIngredients from "./initial_ingredients";
import InitialProduction from "./initial_production";
import InitialDelivery from "./initial_delivery";

const MakeBox: React.FC = () => {
	const { gameState, worldState } = useContext(AppContext);

	const canShowProduction =
		worldState.inventory.getTotalIngredientCount() > 0 ||
		worldState.totalTraitsProduced > 0;

	const canShowDelivery = worldState.totalTraitsProduced > 0;

	return (
		<div className="content">
			<InitialIngredients />

			{canShowProduction && <InitialProduction />}

			{canShowDelivery && <InitialDelivery />}
		</div>
	);
};

export default MakeBox;
