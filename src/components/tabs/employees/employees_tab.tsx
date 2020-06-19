import React, { useContext } from "react";
import AppContext from "../../../state/app_context";

import EmployeeCard from "./employee_card";
import EmployeesSummary from "./employees_summary";

const EmployeesTab: React.FC = (props) => {
	const { worldState } = useContext(AppContext);

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
			{/* <section className="box">
				<h2 className="subtitle">EMPLOYEES</h2>
			</section> */}
			<section className="tile is-ancestor is-vertical">
				<div className="tile is-parent">
					<div className="tile is-child">
						<EmployeesSummary />
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
