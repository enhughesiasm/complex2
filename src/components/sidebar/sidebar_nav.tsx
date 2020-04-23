import React, { useContext } from 'react';
import { GameTabs } from '../../state/game_tabs';
import AppContext from '../../state/app_context';
import FontAwesome from '../shared/font_awesome';

const orderedTabs: Array<GameTabs> = [GameTabs.LETTERS, GameTabs.HANDS];

const SidebarNav: React.FC = (props) => {
	const { gameState, worldState } = useContext(AppContext);

	return (
		<aside className='has-text-centered menu'>
			{/* <p className='menu-label'>nav</p> */}
			<ul className='menu-list'>
				{orderedTabs.map((t) => (
					<li>
						<a
							className={
								gameState.activeTab === t ? 'is-active' : ''
							}
							href='#'
							onClick={() => gameState.changeActiveTab(t)}>
							{t === GameTabs.LETTERS && (
								<>
									<FontAwesome
										icon={
											worldState.letterManager.getUnreadCount() >
											0
												? 'envelope'
												: 'envelope-open'
										}
										status={
											worldState.letterManager.getUnreadCount() >
											0
												? 'danger'
												: ''
										}
									/>
								</>
							)}
							{t !== GameTabs.LETTERS && (
								<FontAwesome icon='circle' />
							)}

							{t}
						</a>
					</li>
				))}
			</ul>
		</aside>
	);
};

export default SidebarNav;
