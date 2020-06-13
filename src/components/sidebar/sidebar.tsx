import React, { useContext } from "react";
import SidebarFooter from "../footer/footer";
import Title from "./title";
import SidebarNav from "./sidebar_nav";
import SidebarStatus from "./sidebar_status";
import FontAwesome from "../shared/font_awesome";
import AppContext from "../../state/app_context";

interface SidebarProps {}

const Sidebar: React.SFC<SidebarProps> = (props) => {
	const { gameState } = useContext(AppContext);

	return (
		<>
			<section className="column is-one-fifth has-text-white has-background-primary is-full-height">
				<Title />
				<SidebarNav />
				<SidebarStatus />
				<div className="has-text-centered">
					<button
						className="button is-medium is-danger"
						onClick={() => gameState.togglePause()}
					>
						<FontAwesome icon="pause-circle" />
					</button>
				</div>
				<SidebarFooter />
			</section>
		</>
	);
};

export default Sidebar;
