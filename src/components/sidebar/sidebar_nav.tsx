import React from "react";
import TabsList from "./tabs_list";

const SidebarNav: React.FC = (props) => {
	return (
		<aside className="has-text-centered menu">
			<TabsList />
		</aside>
	);
};

export default SidebarNav;
