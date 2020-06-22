import React, { useContext } from "react";
import AppContext from "../../../state/app_context";
import TraitsSummary from "./traits_summary";
import StorageSummary from "./storage_summary";

const ComplexTab: React.FC = (props) => {
	// const { worldState } = useContext(AppContext);

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
			</section>
		</>
	);
};

export default ComplexTab;
