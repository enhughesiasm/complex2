import React, { useContext } from "react";
import AppContext from "../../../state/app_context";

// import { useTransition, animated } from "react-spring";
import EmployeeCard from "./employee_card";
import FontAwesome from "../../shared/font_awesome";
import Cost from "../../shared/complex/cost";
import CostButton from "../../shared/complex/cost_button";

const EmployeesTab: React.FC = (props) => {
	const { gameState, worldState } = useContext(AppContext);

	// const surroundingsTransition = useTransition(
	// 	gameState.areSurroundingsUnlocked(),
	// 	null,
	// 	{
	// 		from: { opacity: 0 },
	// 		enter: { opacity: 1 },
	// 		leave: { opacity: 0 },
	// 	}

	// );

	return (
		<>
			<section className="box">
				<h2 className="subtitle">EMPLOYEES</h2>
			</section>
			<section className="tile is-ancestor is-vertical">
				<div className="tile is-parent">
					<div className="tile is-child">
						You have {worldState.employees.all.length} employees.
						<CostButton
							text="hire"
							amount={worldState.employees.getHireCost()}
							canAfford={worldState.employees.canHire(worldState)}
							onPurchase={() => gameState.hireEmployee()}
						/>
					</div>
					<div className="tile is-child box">
						{/* TK move this to a much better place in the UI; also maybe it doesn't make sense */}
						{/* TK maybe a big ol' configuration screen? with many similar options */}
						<div>
							Minimum Delivery Batch Size:{" "}
							{worldState.playerAttributes.minimumDeliveryBatchSize}
							<button
								className="button is-rounded is-info is-small"
								disabled={
									worldState.playerAttributes.minimumDeliveryBatchSize === 1
								}
								onClick={() =>
									worldState.playerAttributes.minimumDeliveryBatchSize--
								}
							>
								<FontAwesome icon="minus" />
							</button>
							{/* TK typable amount... if this ends up making it into the game */}
							<button
								className="button is-rounded is-info is-small"
								disabled={
									worldState.playerAttributes.minimumDeliveryBatchSize ===
									worldState.playerAttributes.deliveryCarryCapacity
								}
								onClick={() =>
									worldState.playerAttributes.minimumDeliveryBatchSize++
								}
							>
								<FontAwesome icon="plus" />
							</button>
						</div>
						<div>
							Rarity Level: {worldState.playerAttributes.maximumRarityLevel}
							<button
								className="button is-rounded is-info is-small"
								disabled={worldState.playerAttributes.maximumRarityLevel === 0}
								onClick={() => worldState.playerAttributes.maximumRarityLevel--}
							>
								<FontAwesome icon="minus" />
							</button>
							{/* TK typable amount... if this ends up making it into the game */}
							<button
								className="button is-rounded is-info is-small"
								disabled={worldState.playerAttributes.maximumRarityLevel === 6}
								onClick={() => worldState.playerAttributes.maximumRarityLevel++}
							>
								<FontAwesome icon="plus" />
							</button>
						</div>
					</div>
				</div>
				<div className="tile is-parent">
					<div className="tile is-child">
						<div className="tile is-parent wrap-child-tiles">
							{worldState.employees.all.map((e) => (
								<EmployeeCard key={e.id} employee={e} />
							))}
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default EmployeesTab;
