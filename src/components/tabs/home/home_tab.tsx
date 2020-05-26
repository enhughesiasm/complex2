import React, { useContext } from "react";
import AppContext from "../../../state/app_context";
import MakeBox from "./make/make_box";
import Surroundings from "./surroundings/surroundings";
import { useTransition, animated } from "react-spring";
import HomeUnsustainableWarning from "./home_unsustainable_warning";

const HomeTab: React.FC = (props) => {
	const { gameState, worldState } = useContext(AppContext);

	const surroundingsTransition = useTransition(
		gameState.areSurroundingsUnlocked(),
		null,
		{
			from: { opacity: 0 },
			enter: { opacity: 1 },
			leave: { opacity: 0 },
		}
	);

	return (
		<>
			{worldState.employees.unlocked && <HomeUnsustainableWarning />}
			<section className="columns">
				<div className="column is-one-third">
					<MakeBox />
				</div>

				<div className="column">
					{surroundingsTransition.map(
						({ item, key, props }) =>
							item && (
								<animated.div key={key} style={props}>
									<Surroundings />
								</animated.div>
							)
					)}
				</div>
			</section>
		</>
	);
};

export default HomeTab;
