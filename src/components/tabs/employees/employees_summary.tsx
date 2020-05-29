import React, { useContext } from "react";
import AppContext from "../../../state/app_context";
import CostButton from "../../shared/complex/cost_button";
import { JobTypes } from "../../../state/jobs/job_types";
import UnassignedRow from "./unassigned_row";
import BasicRow from "./basic_row";

const EmployeesSummary: React.FC = () => {
	const { worldState, gameState } = useContext(AppContext);

	const unassigned = worldState.employees.all.filter(
		(e) => e.assignedJob === JobTypes.NONE
	).length;

	return (
		<>
			{/* TK: arrange this nicer */}
			You have{" "}
			<span className="has-text-success">
				{worldState.employees.all.length}
			</span>{" "}
			employees.
			<CostButton
				text="hire"
				amount={worldState.employees.getHireCost()}
				canAfford={worldState.employees.canHire(worldState)}
				onPurchase={() => gameState.hireEmployee()}
			/>
			<div className="panel">
				<table className="table">
					<tbody>
						{/* TK: probably some duplication in these components - refactor! */}
						<UnassignedRow unassigned={unassigned} />
						{worldState.employees.unlockedJobs.map((job) => {
							return (
								<>
									{" "}
									{job === JobTypes.Gathering && (
										<BasicRow jobType={job} statsPrefix="Ingredients" />
									)}
									{job === JobTypes.Mixing && (
										<BasicRow jobType={job} statsPrefix="Traits" />
									)}
									{job === JobTypes.Delivering && (
										<BasicRow jobType={job} statsPrefix="DeliveredTraits" />
									)}
								</>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default EmployeesSummary;
