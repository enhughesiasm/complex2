import React, { useContext } from 'react';
import HandsTab from '../tabs/hands/hands_tab';
import AppContext from '../../state/app_context';
import LettersTab from '../tabs/letters/letters_tab';
import { GameTabs } from '../../state/game_tabs';

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
