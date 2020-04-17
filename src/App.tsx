import React from 'react';

import IWorldState from './state/IWorldState';
import IGameState from './state/IGameState';
import loadWorldState from './state/load_state';
import GameState from './state/game_state';
import moment from 'moment';
import { process_world } from './state/process_world';
import AppContext from './state/app_context';
import Sidebar from './components/sidebar/sidebar';
import Main from './components/main/main';
import QuickviewContainer from './components/quickviews/quickview_container';

require('./components/shared/type_extensions');

interface IAppProps {}

interface IAppState {
	lastTickTime: moment.Moment;
	worldState: IWorldState;
	gameState: IGameState;
}

export default class App extends React.Component<IAppProps, IAppState> {
	timerID?: number;

	constructor(props: IAppProps) {
		console.log('new app');
		super(props);

		const worldState = loadWorldState();
		const gameState = new GameState(worldState);

		this.state = {
			lastTickTime: moment(),
			gameState: gameState,
			worldState: worldState,
		};
	}

	componentDidMount() {
		this.timerID = window.setInterval(
			() => this.tick(),
			this.state.gameState.tickLengthMs
		);
	}

	tick() {
		// each unlocked section needs to tick
		const delta_sec = moment().diff(this.state.lastTickTime) / 1000.0;

		const new_world_state = process_world(delta_sec, this.state.worldState);

		this.setState({ lastTickTime: moment(), worldState: new_world_state });
	}

	render() {
		return (
			<>
				<AppContext.Provider
					value={{
						worldState: this.state.worldState,
						gameState: this.state.gameState,
					}}>
					<div id='complexPage' className='columns is-full-height'>
						<Sidebar />
						<Main />
					</div>
					<QuickviewContainer />
				</AppContext.Provider>
			</>
		);
	}
}
