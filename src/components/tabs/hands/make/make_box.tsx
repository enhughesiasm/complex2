import React, { useContext } from 'react';
import AppContext from '../../../../state/app_context';

const MakeBox: React.FC = () => {
	const { gameState, worldState } = useContext(AppContext);

	return (
		<div
			className='tile is-parent'
			style={{ minHeight: '40vh', maxHeight: '40vh' }}>
			<div className='tile is-child is-8'>
				<button
					className='button is-small is-rounded is-primary'
					onClick={() => gameState.handProduceTrait()}>
					instamake
				</button>
			</div>
			<div className='tile is-child is-4'>iosjfiosj</div>
		</div>
	);
};

export default MakeBox;
