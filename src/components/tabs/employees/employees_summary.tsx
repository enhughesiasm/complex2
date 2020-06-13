import React, { useContext, useState } from "react";
import AppContext from "../../../state/app_context";
import CostButton from "../../shared/complex/cost_button";
import { JobTypes } from "../../../state/jobs/job_types";
import UnassignedRow from "./unassigned_row";
import BasicRow from "./basic_row";
import ExploringRow from "./exploring_row";
import ResearchingRow from "./researching_row";

const EmployeesSummary: React.FC = () => {
	const { worldState, gameState } = useContext(AppContext);

	const [hireType, setHireType] = useState(JobTypes.Gathering);

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
			<CostButton
				text="hire"
				amount={worldState.employees.getHireCost()}
				canAfford={worldState.employees.canHire(worldState)}
				onPurchase={() => gameState.hireEmployee(hireType)}
			/>
			<select
				id="hireEmployeeSelect"
				name="hireEmployeeSelect"
				className="dropdown"
				value={hireType}
				onChange={(e) => setHireType(e.currentTarget.value as JobTypes)}
			>
				{worldState.employees.unlockedJobs.map((j) => (
					<option key={j} value={j}>
						{j}
					</option>
				))}
			</select>
			<div className="panel">
				<table className="table">
					<tbody>
						{/* TK: probably some duplication in these components - refactor! */}
						<UnassignedRow unassigned={unassigned} />
						{worldState.employees.unlockedJobs.map((job) => {
							return (
								<React.Fragment key={job}>
									{job === JobTypes.Gathering && (
										<BasicRow jobType={job} statsPrefix="Ingredients" />
									)}
									{job === JobTypes.Mixing && (
										<BasicRow jobType={job} statsPrefix="Traits" />
									)}
									{job === JobTypes.Delivering && (
										<BasicRow jobType={job} statsPrefix="DeliveredTraits" />
									)}
									{job === JobTypes.Exploring && <ExploringRow />}
									{job === JobTypes.Researching && <ResearchingRow />}
								</React.Fragment>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default EmployeesSummary;
