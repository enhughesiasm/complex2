import React, { useContext } from 'react';
import AppContext from '../../../state/app_context';
import MakeBox from './make/make_box';
import Surroundings from './surroundings/surroundings';
import { useTransition, animated } from 'react-spring';

const HandsTab: React.FC = (props) => {
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
		<section className='box tile is-ancestor is-vertical is-full-height'>
			<h2 className='has-text-weight-bold subtitle is-size-6'>HANDS</h2>
			<MakeBox />

			{surroundingsTransition.map(
				({ item, key, props }) =>
					item && (
						<animated.div key={key} style={props}>
							<Surroundings />
						</animated.div>
					)
			)}
		</section>
	);
};

export default HandsTab;
