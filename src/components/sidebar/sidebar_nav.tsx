import React from "react";
import Tabs from "./tabs";

const SidebarNav: React.FC = (props) => {
	return (
		<aside className="has-text-centered menu">
			<Tabs />
		</aside>
	);
};

export default SidebarNav;
