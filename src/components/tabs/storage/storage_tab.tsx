import React, { useContext } from "react";
import AppContext from "../../../state/app_context";

import FontAwesome from "../../shared/font_awesome";

const StorageTab: React.FC = (props) => {
	const { worldState } = useContext(AppContext);

	return (
		<>
			<section className="box">
				<h2 className="subtitle">STORAGE</h2>
			</section>
			<section className="tile is-ancestor is-vertical">
				<div className="tile is-parent">
					<div className="tile is-child">
						<div className="smallPrint">for now, simple counts:</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default StorageTab;
