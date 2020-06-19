import React, { useContext } from "react";
import AppContext from "../../state/app_context";
import rarities from "../../state/traits/rarity_levels";

const SidebarStatus: React.FC = (props) => {
	const { worldState } = useContext(AppContext);

	return (
		<aside className="has-text-centered">
			<div
				className="notification is-warning is-flex"
				style={{ justifyContent: "center", alignItems: "center" }}
			>
				<span className="has-text-weight-bold">Favours: </span>
				<span className="is-size-4 pl-1 is-family-code">
					{worldState.favours}
				</span>
			</div>
			<div className="is-divider" data-content="TRAITS temp"></div>
			<div>
				<span className="has-text-weight-bold">Produced: </span>
				<span className="">{worldState.totalTraitsProduced}</span>
			</div>
			<div>
				<span className="has-text-weight-bold">Wasted: </span>
				<span className="">{worldState.totalTraitsWasted}</span>
			</div>
			<div>
				<span className="has-text-weight-bold">Stored: </span>
				<span
					className={
						worldState.storage.getTotalStored() >=
						worldState.storage.getCapacity()
							? "has-text-danger"
							: ""
					}
				>
					{worldState.storage.getTotalStored()} /{" "}
					{worldState.storage.getCapacity()} (
					{
						rarities.getLevel(worldState.storage.getHighestRarity())
							.ingredientDisplay
					}
					)
				</span>
			</div>
			<div>
				<span className="has-text-weight-bold">Delivered: </span>
				<span className="">{worldState.shop.totalReceived()}</span>
			</div>
			<div className="is-divider" data-content="INGREDIENTS (mebbe move)"></div>
			<div>
				<span className="has-text-weight-bold">
					{rarities.getLevel(0).ingredientDisplay}:{" "}
				</span>
				<span className="">{worldState.inventory.ingredients.get(0)}</span>
			</div>
		</aside>
	);
};

export default SidebarStatus;
