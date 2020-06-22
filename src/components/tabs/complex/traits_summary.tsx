import React, { useContext, useState } from "react";
import AppContext from "../../../state/app_context";
import rarities from "../../../state/traits/rarity_levels";
import { useTransition, animated } from "react-spring";
import FontAwesome from "../../shared/font_awesome";
import friendly_number from "../../shared/complex/friendly_number";

const TraitsSummary = () => {
	const { worldState } = useContext(AppContext);

	const [isTableCollapsed, setTableCollapsed] = useState(true);

	const collapseTransition = useTransition(!isTableCollapsed, null, {
		from: { transform: "translate3d(0,-90px,0)", opacity: 0 },
		enter: { transform: "translate3d(0,0px,0)", opacity: 1 },
		leave: { transform: "translate3d(0,-90px,0)", opacity: 0 },
	});

	return (
		<table className="table is-centered is-unselectable">
			<thead>
				<tr className="has-background-primary has-text-weight-bold">
					<td></td>
					<td className="has-text-light">Raw Ingredients</td>
					<td className="has-text-light">Traits Stored</td>
					<td className="has-text-light">Traits in transit</td>
					<td className="has-text-light">Traits Delivered</td>
					<td></td>
				</tr>
			</thead>
			<tbody>
				<tr
					className="has-background-primary has-text-weight-bold has-text-light is-size-3"
					onClick={() => setTableCollapsed(!isTableCollapsed)}
				>
					<td>TOTAL</td>
					<td>
						{friendly_number(worldState.inventory.getTotalIngredientCount())}
					</td>
					<td>{friendly_number(worldState.storage.getTotalStored())}</td>
					<td>
						{friendly_number(
							worldState.employees.getTotalCarriedByDeliverers()
						)}{" "}
					</td>
					<td>{friendly_number(worldState.shop.received.getTotal())}</td>
					<td>
						<FontAwesome icon={isTableCollapsed ? "caret-down" : "caret-up"} />
					</td>
				</tr>

				{collapseTransition.map(
					({ item, key, props }) =>
						item &&
						[...Array(7)].map((r, i) => (
							<animated.tr
								key={"row" + i}
								style={props}
								className={"is-rarity-" + i}
							>
								<td> {rarities.getLevel(i).ingredientDisplay}</td>
								<td>
									{" "}
									{friendly_number(
										worldState.inventory.getIngredientAmount(i)
									)}{" "}
								</td>
								<td> {friendly_number(worldState.storage.getAmount(i))}</td>
								<td>
									{" "}
									{friendly_number(
										worldState.employees.getCarriedByDeliverers(i)
									)}
								</td>
								<td> {friendly_number(worldState.shop.received.get(i))}</td>
								<td></td>
							</animated.tr>
						))
				)}
			</tbody>
		</table>
	);
};

export default TraitsSummary;
