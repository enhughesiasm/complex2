import React, { useContext } from "react";
import AppContext from "../../../state/app_context";
import { JobTypes } from "../../../state/jobs/job_types";
import { historyMonitorTypes } from "../../../state/history/history_monitors";

interface IBasicEmployeeRowProps {
	jobType: JobTypes;
	statsPrefix: string;
}

const BasicRow: React.FC<IBasicEmployeeRowProps> = ({
	jobType,
	statsPrefix,
}) => {
	const { worldState, gameState } = useContext(AppContext);

	const working = worldState.employees.all.filter(
		(e) => e.assignedJob === jobType
	).length;

	return (
		<tr>
			<td className="has-text-weight-bold">{jobType}</td>
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
			<td>avgHap</td>
			{[
				...Array(
					Math.min(worldState.playerAttributes.maximumRarityLevel + 1, 7)
				),
			].map((a, i) => {
				const stat = gameState.history.stats.filter(
					(a) => a.name === historyMonitorTypes[`${statsPrefix}${i}`]
				)[0];
				return (
					<td
						key={`${statsPrefix}${i}`}
						className={
							"is-rarity-" +
							i +
							" " +
							"has-text-" +
							(stat.currentVelocitySec > 0
								? "success"
								: stat.currentVelocitySec < 0
								? "danger"
								: "primary")
						}
					>
						{stat.currentVelocitySec.toFixed(2)}
						/s
					</td>
				);
			})}
		</tr>
	);
};

export default BasicRow;
