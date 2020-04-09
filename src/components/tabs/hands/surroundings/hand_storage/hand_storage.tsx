import React, { useContext } from 'react';
import AppContext from '../../../../../state/app_context';
import HandsTrait from '../../hands_trait';
import { useTransition, animated } from 'react-spring';

const HandStorage: React.FC = () => {
	const { gameState, worldState } = useContext(AppContext);

	const traitTransitions = useTransition(
		worldState.handTraits,
		(item) => item.id,
		{
			config: { mass: 3, friction: 30 },
			from: { transform: 'translate3d(-60px,0,0)' },
			enter: {
				transform: 'translate3d(0,0px,0)',
				opacity: 1,
				height: '50px',
			},
			leave: {
				transform: 'translate3d(160px,0,0)',
				height: '0px',
				opacity: 0,
			},
		}
	);

	return (
		<div
			className='tile is-child box'
			style={{
				background: worldState.handSurroundings.backgroundImage,
				backgroundColor:
					worldState.handSurroundings.backgroundColor ?? 'inherit',
				backgroundSize: worldState.handSurroundings.backgroundSize,
				backgroundPosition:
					worldState.handSurroundings.backgroundPosition ??
					'initial !important',
			}}>
			<h3 className='subtitle has-text-weight-bold'>
				{worldState.handSurroundings.name}
			</h3>
			{traitTransitions.map(({ item, props, key }) => (
				<animated.div key={key} style={props}>
					<HandsTrait trait={item} />
				</animated.div>
			))}
		</div>
	);
};

export default HandStorage;
