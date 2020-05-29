import React, { useContext } from "react";
import AppContext from "../../../state/app_context";
import rarities from "../../../state/traits/rarity_levels";
import FontAwesome from "../../shared/font_awesome";
// import rarities from './../../'

const StorageTab: React.FC = (props) => {
	const { worldState } = useContext(AppContext);
	const { storage } = worldState;

	return (
		<>
			<section className="box">
				<h2 className="subtitle">STORAGE</h2>
			</section>

			<section className="tile is-ancestor is-vertical">
				<div className="tile is-parent">
					<div className="tile is-child">
						<div className="smallPrint">for now, simple counts:</div>
						<span className="is-size-3">total: {storage.getTotalStored()}</span>
						<div>
							{storage.stored
								.getIterator()
								.toArray()
								.map((l) => (
									<div key={l.level}>
										<span
											style={{ minWidth: "10rem", display: "inline-block" }}
										>
											{rarities.getLevel(l.level).display}
										</span>{" "}
										- <span> {l.amount}</span>
									</div>
								))}
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default StorageTab;
