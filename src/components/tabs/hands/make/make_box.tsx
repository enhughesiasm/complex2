import React, { useContext } from 'react';
import AppContext from '../../../../state/app_context';
import {
	ingredientLevel,
	ingredientLevelStrings,
} from '../../../../state/data/ingredient_levels';

const MakeBox: React.FC = () => {
	const { gameState, worldState } = useContext(AppContext);

	return (
		<div
			className='tile is-parent'
			style={{ minHeight: '40vh', maxHeight: '40vh' }}>
			<div className='tile is-child is-8'>
				<div>
					<button
						className='button is-small is-rounded is-primary'
						onClick={() => gameState.gatherBasicIngredients()}>
						gather
					</button>
				</div>
				<button
					className='button is-small is-rounded is-primary'
					onClick={() => gameState.handProduceTrait()}>
					instamake
				</button>
			</div>
			<div className='tile is-child is-4 box'>
				<div className='is-divider' data-content='INGREDIENTS' />

				{Object.keys(ingredientLevel).map((il) => {
					const amount =
						worldState.inventory.ingredients.get(il) || 0;
					if (amount <= 0) return <></>;
					return (
						<div>
							{' '}
							{il}: {amount}{' '}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default MakeBox;
