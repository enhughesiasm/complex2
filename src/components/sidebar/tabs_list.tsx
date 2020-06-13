import React, { useContext } from "react";
import Tab from "./tab";
import { GameTabType } from "../../state/game_tabs";
import AppContext from "../../state/app_context";
import { JobTypes } from "../../state/jobs/job_types";

const TabsList: React.FC = (props) => {
	const { worldState } = useContext(AppContext);
	const unreadLetters = worldState.letterManager.getUnreadCount() > 0;
	const unclaimedRewards =
		worldState.targets.find((a) => a.completed && !a.claimed) !== undefined;

	return (
		<ul className="menu-list">
			<Tab
				icon={unreadLetters ? "envelope" : "envelope-open"}
				iconStatus={unreadLetters ? "danger" : ""}
				type={GameTabType.LETTERS}
				enabled={true}
				visible={true}
				needsAttention={unreadLetters}
			>
				LETTERS
			</Tab>
			<Tab
				icon={"home"}
				iconStatus={"light"}
				type={GameTabType.HOME}
				enabled={true}
				visible={true}
				needsAttention={false}
			>
				YOUR HOUSE
			</Tab>
			<Tab
				icon={"circle"}
				iconStatus={!unclaimedRewards ? "light" : "danger"}
				type={GameTabType.SHOP}
				enabled={worldState.worldFlags.handDeliveredFirstBatch}
				visible={worldState.worldFlags.handDeliveredFirstBatch}
				needsAttention={unclaimedRewards}
			>
				SHOP
			</Tab>
			<Tab
				icon={"circle"}
				iconStatus={"light"}
				type={GameTabType.EMPLOYEES}
				enabled={worldState.employees.unlocked}
				visible={worldState.employees.unlocked}
				needsAttention={false}
			>
				EMPLOYEES
			</Tab>
			<Tab
				icon={"flask"}
				iconStatus={"success"}
				type={GameTabType.RESEARCH}
				enabled={true} // TK: revisit this
				visible={
					worldState.employees.unlockedJobs.filter(
						(e) => e === JobTypes.Researching
					).length > 0
				}
				needsAttention={false}
			>
				RESEARCH
			</Tab>
			<Tab
				icon={"circle"}
				iconStatus={"light"}
				type={GameTabType.STORAGE}
				enabled={worldState.employees.unlocked}
				visible={worldState.employees.unlocked}
				needsAttention={worldState.storage.isFull()}
			>
				STORAGE
			</Tab>
			<Tab
				icon={"globe-europe"}
				iconStatus={"success"}
				type={GameTabType.MAP}
				enabled={true} // TK: revisit this
				visible={true}
				needsAttention={false}
			>
				MAP
			</Tab>
		</ul>
	);
};

export default TabsList;
