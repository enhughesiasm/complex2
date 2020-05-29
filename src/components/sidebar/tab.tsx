import React, { useContext } from "react";
import AppContext from "../../state/app_context";
import { GameTabType } from "../../state/game_tabs";
import FontAwesome from "../shared/font_awesome";

interface ITabProps {
	type: GameTabType;
	icon: string;
	iconStatus: string;
	enabled: boolean;
	visible: boolean;
	needsAttention: boolean;
}

const Tab: React.FC<ITabProps> = ({
	type,
	icon,
	iconStatus,
	enabled,
	children,
	visible,
	needsAttention,
}) => {
	const { gameState, worldState } = useContext(AppContext);

	return (
		<>
			{visible && (
				<li className={needsAttention ? "needs-attention" : ""}>
					<a
						className={
							(worldState.activeTab === type ? "is-active" : "") +
							" " +
							(enabled ? "is-enabled" : "")
						}
						href="/"
						onClick={(e) => {
							e.preventDefault();
							if (enabled) {
								gameState.changeActiveTab(type);
							}
						}}
					>
						<FontAwesome icon={icon ?? "circle"} status={iconStatus} />

						{children}
					</a>
				</li>
			)}
		</>
	);
};

export default Tab;
