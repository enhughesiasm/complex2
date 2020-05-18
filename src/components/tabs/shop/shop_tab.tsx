import React, { useContext } from "react";
import AppContext from "../../../state/app_context";
import shopImg from "./../../../resources/images/shop.jpg";
import { useTransition, animated } from "react-spring";
import CurrentTargets from "./current_targets";

const ShopTab: React.FC = (props) => {
	const { gameState, worldState } = useContext(AppContext);

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
		<section className="tile is-ancestor is-vertical">
			<div className="tile is-parent">
				<div className="tile is-child">
					<div className="content">
						<h3 className="subtitle">welcome to The Shop Before Life</h3>
						<img src={shopImg} style={{ width: "100px" }} />
						{/* TK fix all this */}
						<p>a greeting from the Shopkeeper here</p>
					</div>
				</div>
			</div>
			<div className="tile is-parent">
				<div className="tile is-child box">
					<span>later, add supply/demand stats here</span>
				</div>
			</div>
			<div className="tile is-parent">
				<div className="tile is-child box">
					<CurrentTargets />
				</div>
			</div>
		</section>
	);
};

export default ShopTab;
