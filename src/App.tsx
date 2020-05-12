import React from "react";
import IWorldState from "./state/IWorldState";
import loadWorldState from "./state/load_state";
import GameState from "./state/game_state";
import moment from "moment";
import { tick_game } from "./state/tick_game";
import AppContext from "./state/app_context";
import Sidebar from "./components/sidebar/sidebar";
import Main from "./components/main/main";
import QuickviewContainer from "./components/quickviews/quickview_container";

interface IAppProps {}

interface IAppState {
	lastTickTime: moment.Moment;
	worldState: IWorldState;
	gameState: GameState;
}

export default class App extends React.Component<IAppProps, IAppState> {
	timerID?: number;

	constructor(props: IAppProps) {
		console.log("new app");
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

		const new_game_state = tick_game(delta_sec, this.state.gameState);

		// TODO TK: is this mad? why process the game state just to rewrite the world state?
		this.setState({
			lastTickTime: moment(),
			worldState: new_game_state.worldState,
		});
	}

	render() {
		return (
			<>
				<AppContext.Provider
					value={{
						worldState: this.state.worldState,
						gameState: this.state.gameState,
					}}
				>
					<div id="complexPage" className="columns is-full-height">
						<Sidebar />
						<Main />
					</div>
					<QuickviewContainer />
				</AppContext.Provider>
			</>
		);
	}
}
