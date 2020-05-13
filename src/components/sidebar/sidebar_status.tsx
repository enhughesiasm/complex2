import React, { useContext } from "react";
import AppContext from "../../state/app_context";
import { ingredientLevel } from "../../state/data/ingredient_levels";

const SidebarStatus: React.FC = (props) => {
	const { worldState, gameState } = useContext(AppContext);

	return (
		<aside className="has-text-centered notification is-light">
			<div className="notification is-warning">
				<span className="has-text-weight-bold">Favours: </span>
				<span className="">{worldState.favours}</span>
			</div>
			<div className="is-divider" data-content="TRAITS"></div>
			<div>
				<span className="has-text-weight-bold">Produced: </span>
				<span className="">{worldState.totalTraitsProduced}</span>
			</div>
			<div>
				<span className="has-text-weight-bold">Delivered: </span>
				<span className="">{worldState.totalTraitsDelivered()}</span>
			</div>
			<div className="is-divider" data-content="INGREDIENTS (mebbe move)"></div>
			<div>
				<span className="has-text-weight-bold">{ingredientLevel.Basic}: </span>
				<span className="">
					{worldState.inventory.ingredients.get(ingredientLevel.Basic)}
				</span>
			</div>
		</aside>
	);
};

export default SidebarStatus;
