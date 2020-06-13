import React, { useContext } from "react";
import AppContext from "../../../state/app_context";
import { JobTypes } from "../../../state/jobs/job_types";
import Tree from "react-d3-tree";
import ResearchNode from "./research_node";
import { IResearchItem } from "../../../state/research/IResearchItem";
import FontAwesome from "../../shared/font_awesome";
import ResearchHover from "./research_hover";

const ResearchTab: React.FC = (props) => {
	const { worldState } = useContext(AppContext);

	const current =
		worldState.research.currentId !== undefined
			? worldState.research.getItem(worldState.research.currentId)
			: undefined;

	return (
		<>
			<section className="box">
				<h2 className="subtitle">RESEARCH</h2>
			</section>
			<section className="tile is-ancestor is-vertical">
				<div className="tile is-parent">
					<div className="tile is-child">
						Researchers:{" "}
						{worldState.employees.getAmountAssigned(JobTypes.Researching)}
					</div>
					<div
						className="tile is-child is-flex"
						style={{ alignItems: "center" }}
					>
						<div>
							<span className="bubbles" />

							<FontAwesome
								icon="flask"
								style={{ fontSize: "40pt" }}
								size="large"
							/>
						</div>

						<span className="ml-3">
							Currently researching:{" "}
							<span className="has-text-weight-bold">{current?.name}</span>
							<progress
								className="progress"
								value={current?.progressPercent ?? 0}
								max={100}
							/>
						</span>
					</div>
				</div>
				<div className="tile is-parent">
					<div className="tile is-child is-2 box has-background-dark has-text-white">
						<ResearchHover />
					</div>
					<div className="tile is-child is-10" style={{ minHeight: "60vh" }}>
						<Tree
							data={worldState.research.tree}
							nodeSvgShape={{
								shape: "rect",
								shapeProps: {
									width: 0,
									height: 20,
									x: 0,
									y: 0,
								},
							}}
							transitionDuration={0}
							zoomable={false}
							zoom={1}
							depthFactor={120}
							collapsible={false}
							orientation={"vertical"}
							translate={{ x: 500, y: 20 }}
							nodeSize={{ x: 200, y: 30 }}
							allowForeignObjects
							nodeLabelComponent={{
								render: <ResearchNode />,
								foreignObjectWrapper: {
									y: 0,
									x: -50,
									height: 100,
								},
							}}
							onMouseOver={(node) =>
								worldState.research.setHover(node as IResearchItem)
							}
						/>
					</div>
				</div>
			</section>
		</>
	);
};

export default ResearchTab;
