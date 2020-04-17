import React, { useContext } from 'react';
import HandsTab from '../tabs/hands/hands_tab';
import AppContext from '../../state/app_context';
import { GameTabs } from '../../state/IGameState';
import LettersTab from '../tabs/letters/letters_tab';

interface MainProps {}

const Main: React.SFC<MainProps> = (props) => {
	const { gameState } = useContext(AppContext);

	return (
		<>
			<main className='column is-full-height'>
				{gameState.activeTab === GameTabs.HANDS && <HandsTab />}
				{gameState.activeTab === GameTabs.LETTERS && <LettersTab />}
			</main>
		</>
	);
};

export default Main;
