import React, { useContext } from "react";
import AppContext from "../../state/app_context";
import { GameTabType } from "../../state/game_tabs";
import FontAwesome from "../shared/font_awesome";

interface ITabProps {
	type: GameTabType;
	icon: string;
	iconStatus: string;
	enabled: boolean;
}

const Tab: React.FC<ITabProps> = ({
	type,
	icon,
	iconStatus,
	enabled,
	children,
}) => {
	const { gameState, worldState } = useContext(AppContext);

	return (
		<li>
			<a
				className={
					(gameState.activeTab === type ? "is-active" : "") +
					" " +
					(enabled ? "is-enabled" : "")
				}
				href="#"
				onClick={() => {
					if (enabled) {
						gameState.changeActiveTab(type);
					}
				}}
			>
				<FontAwesome icon={icon || "circle"} status={iconStatus} />

				{children}
			</a>
		</li>
	);
};

export default Tab;
