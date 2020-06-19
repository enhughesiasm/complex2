import React, { useContext, useRef } from "react";
import AppContext from "../../../state/app_context";
import { JobTypes } from "../../../state/jobs/job_types";
import FontAwesome from "../../shared/font_awesome";
import ResearchHover from "./research_hover";
import ResearchTree from "./research_tree";

const ResearchTab: React.FC = (props) => {
	const { worldState } = useContext(AppContext);

	const treeContainerRef = useRef(null);

	const current =
		worldState.research.currentId !== undefined
			? worldState.research.getItem(worldState.research.currentId)
			: undefined;

	const assigned = worldState.employees.getAmountAssigned(JobTypes.Researching);

	return (
		<>
			{/* <section className="box">
				<h2 className="subtitle">RESEARCH</h2>
			</section> */}
			<section className="tile is-ancestor is-vertical">
				<div className="tile is-parent">
					<div
						className="tile is-child is-flex has-text-centered"
						style={{ alignItems: "center", justifyContent: "center" }}
					>
						<div>
							<span className="bubbles" />

							<FontAwesome
								icon="flask"
								style={{ fontSize: "40pt" }}
								size="large"
							/>
						</div>

						<span className="ml-6">
							There {assigned !== 1 ? "are" : "is"} {assigned} researcher
							{assigned !== 1 ? "s" : ""}, currently researching:{" "}
							<span className="has-text-weight-bold">
								{current?.name ?? "Nothing"}
							</span>
							<progress
								className="progress is-success"
								value={current?.progressPercent ?? 0}
								max={100}
							/>
						</span>
						<span className="is-pulled-right ml-6">
							<button
								className="button is-danger is-rounded is-small"
								onClick={() => worldState.research.clearResearch()}
							>
								<FontAwesome size="small" icon="pause" />
							</button>
						</span>
					</div>
				</div>
				<div className="tile is-parent">
					<ResearchHover />

					<div
						ref={treeContainerRef}
						className="tile is-child is-10"
						style={{ minHeight: "60vh" }}
					>
						<ResearchTree parentRef={treeContainerRef} />
					</div>
				</div>
			</section>
		</>
	);
};

export default ResearchTab;
