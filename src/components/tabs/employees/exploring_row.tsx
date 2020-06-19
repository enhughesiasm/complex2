import React, { useContext } from "react";
import AppContext from "../../../state/app_context";
import { JobTypes } from "../../../state/jobs/job_types";
import CostButton from "../../shared/complex/cost_button";

const ExploringRow: React.FC = () => {
	const { worldState, gameState } = useContext(AppContext);

	const { prelifeMap } = worldState;

	const working = worldState.employees.all.filter(
		(e) => e.assignedJob === JobTypes.Exploring
	).length;

	return (
		<tr>
			<td className="has-text-weight-bold">{JobTypes.Exploring}</td>
			<td>
				<span
					className={
						"has-text-weight-bold has-text-" +
						(working === 0 ? "danger" : "success")
					}
				>
					{working}
				</span>{" "}
				{working === 1 ? "person" : "people"}
			</td>
			<td>
				<CostButton
					text="hire"
					amount={worldState.employees.getHireCost()}
					canAfford={worldState.employees.canHire(worldState)}
					onPurchase={() => gameState.hireEmployee(JobTypes.Exploring)}
				/>
			</td>
			<td>avgHap</td>
			{[
				...Array(
					Math.min(
						worldState.playerAttributes.getRarityLevel(worldState.research) + 1,
						7
					)
				),
			].map((a, i) => {
				const discovered = prelifeMap.isResourceDiscovered(i);
				return (
					<td
						key={i}
						className={
							"is-rarity-" +
							i +
							" " +
							"has-text-" +
							(discovered ? "success" : "danger")
						}
					>
						{discovered ? "Discovered" : "Undiscovered"}
					</td>
				);
			})}
		</tr>
	);
};

export default ExploringRow;
