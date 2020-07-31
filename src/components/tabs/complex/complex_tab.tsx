import React, { useContext } from "react";
import AppContext from "../../../state/app_context";
import TraitsSummary from "./traits_summary";
import StorageSummary from "./storage_summary";
import ComplexMap from "./complex_map/complex_map";
import all_buildings from "../../../state/complex_area/buildings/all_buildings";
import FontAwesome from "../../shared/font_awesome";
import Cost from "../../shared/complex/cost";

const ComplexTab: React.FC = (props) => {
	const { worldState } = useContext(AppContext);
	const { complexArea } = worldState;

	return (
		<>
			<section className="tile is-ancestor is-vertical">
				<div className="tile is-parent">
					<div className="tile is-child is-8">
						<TraitsSummary />
					</div>
					<div className="tile is-child">
						<StorageSummary />
					</div>
				</div>
				<div className="tile is-parent">
					<div className="tile is-child is-6">
						<ComplexMap />
					</div>
					<div className="tile is-child is-6 notification is-primary is-light">
						{all_buildings.map((b) => (
							<div
								className={
									b.type === complexArea.selectedBuilding.type
										? "has-background-warning has-text-dark"
										: "has-background-light"
								}
								style={{
									border: "1px solid black",
									cursor: "pointer",
								}}
								onClick={() => complexArea.setSelectedBuilding(b.type)}
							>
								<img src={b.imageGhost} /> {b.displayName}{" "}
								<Cost amount={complexArea.getBuildingCost(b)} />
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
};

export default ComplexTab;
