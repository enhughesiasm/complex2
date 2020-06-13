import React, { useContext } from "react";
import Employee from "../../../state/employees/employee";
import AppContext from "../../../state/app_context";
import Circle from "react-circle";
import styleVariables from "../../../resources/styles/styles";
import TemporaryText from "../../shared/temporary_text";

interface IEmployeeCardProps {
	employee: Employee;
}

const EmployeeCard: React.FC<IEmployeeCardProps> = ({ employee }) => {
	const { worldState } = useContext(AppContext);

	return (
		<div className="tile is-child is-4" style={{ padding: "1rem" }}>
			<div className="card">
				<div className="card-header has-background-info-light has-text-success">
					<div className="card-header-title content">{employee.name}</div>
				</div>
				<div className="card-content table-container">
					<h6 className="has-text-weight-bold">Skills</h6>
					<table className="table is-narrow is-bordered is-striped is-centered">
						{/* <thead>
							<tr className="has-text-weight-bold">
								<td>Job</td>
								<td>Level</td>
								<td>Exp</td>
							</tr>
						</thead> */}
						<tbody>
							{employee.experience
								.filter((a) =>
									worldState.employees.unlockedJobs.includes(a.jobType)
								)
								.map((e) => (
									<tr
										key={e.jobType}
										className={
											e.jobType === employee.assignedJob ? "is-selected" : ""
										}
									>
										<td>{e.jobType}</td>
										<td>{e.level}</td>
										<td>{e.experience}</td>
										<td>
											<button
												className="button is-primary is-rounded is-small"
												onClick={() => employee.assign(e.jobType)}
												disabled={e.jobType === employee.assignedJob}
											>
												{e.jobType === employee.assignedJob ? "" : "assign"}
											</button>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
				<div className="card-footer">
					<div className="card-footer-item">
						<span className="has-text-weight-bold">Currently: </span>
					</div>
					<div className="card-footer-item">
						{employee.currentAction ?? "Idle"}
						{employee.carrying && (
							<span> ({employee.carrying.getTotal()})</span>
						)}
					</div>
					<div className="card-footer-item">
						<Circle
							progress={employee.currentJobProgress}
							animate={true}
							animationDuration={"10ms"}
							showPercentage={false}
							progressColor={styleVariables.info}
							size="20"
							roundedStroke={true}
							lineWidth="50"
						/>
						{employee.secsSinceCompleted > 0 && (
							<TemporaryText
								secsSinceStart={employee.secsSinceCompleted}
								text={employee.completedMessage ?? ""}
							/>
						)}
					</div>
				</div>
				<div className="card-footer">
					<div className="card-footer-item">
						<span className="has-text-weight-bold">Happiness: </span>
					</div>
					<div className="card-footer-item">
						<span>{(employee.happinessFactor * 100).toFixed(2)}%</span>
					</div>
					<div className="card-footer-item">
						<button
							className="button is-rounded is-success is-small"
							onClick={() => alert("paid")}
						>
							pay
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EmployeeCard;
