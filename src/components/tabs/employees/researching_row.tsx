import React, { useContext } from "react";
import AppContext from "../../../state/app_context";
import { JobTypes } from "../../../state/jobs/job_types";
import CostButton from "../../shared/complex/cost_button";

const ResearchingRow: React.FC = () => {
	const { worldState, gameState } = useContext(AppContext);

	// const { prelifeMap } = worldState;

	const working = worldState.employees.all.filter(
		(e) => e.assignedJob === JobTypes.Researching
	).length;

	return (
		<tr>
			<td className="has-text-weight-bold">{JobTypes.Researching}</td>
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
					onPurchase={() => gameState.hireEmployee(JobTypes.Researching)}
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
				return <td key={i}>.</td>;
			})}
		</tr>
	);
};

export default ResearchingRow;
