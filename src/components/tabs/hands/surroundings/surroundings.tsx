import React, { useContext } from 'react';
import AppContext from '../../../../state/app_context';
import HandStorage from './hand_storage/hand_storage';

const Surroundings: React.FC = () => {
	const { gameState, worldState } = useContext(AppContext);

	return (
		<div className='tile is-parent'>
			<HandStorage />

			<div className='tile is-child box'>
				<p>People nearby goes here</p>
				<p>
					possibly: remove deliver buttons from the jars, as they're
					just storage!
				</p>
			</div>
		</div>
	);
};

export default Surroundings;
