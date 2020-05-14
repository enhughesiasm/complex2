import React, { useContext } from "react";
import Tab from "./tab";
import { GameTabType } from "../../state/game_tabs";
import AppContext from "../../state/app_context";

const Tabs: React.FC = (props) => {
	const { gameState, worldState } = useContext(AppContext);
	const unreadLetters = worldState.letterManager.getUnreadCount() > 0;

	return (
		<ul className="menu-list">
			<Tab
				icon={unreadLetters ? "envelope" : "envelope-open"}
				iconStatus={unreadLetters ? "danger" : ""}
				type={GameTabType.LETTERS}
				enabled={true}
			>
				LETTERS
			</Tab>
			<Tab
				icon={"home"}
				iconStatus={"dark"}
				type={GameTabType.HOME}
				enabled={true}
			>
				YOUR HOUSE
			</Tab>
			<Tab
				icon={"circle"}
				iconStatus={"warning"}
				type={GameTabType.SHOP}
				enabled={worldState.worldFlags.handDeliveredFirstBatch}
			>
				SHOP
			</Tab>
		</ul>
	);
};

export default Tabs;
