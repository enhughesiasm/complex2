import { DebugBox } from "./debug_box";
import React, { useContext } from "react";
import HomeTab from "../tabs/home/home_tab";
import AppContext from "../../state/app_context";
import LettersTab from "../tabs/letters/letters_tab";
import { GameTabType } from "../../state/game_tabs";
import ShopTab from "../tabs/shop/shop_tab";
import Enumerable from "linq";
import EmployeesTab from "../tabs/employees/employees_tab";
import ComplexTab from "../tabs/complex/complex_tab";
import PrelifeMapTab from "../prelife_map/prelife_map_tab";
import ResearchTab from "../tabs/research/research_tab";

interface MainProps {}

// TK remove this later
const implementedTabs = Enumerable.from([
	GameTabType.HOME,
	GameTabType.LETTERS,
	GameTabType.SHOP,
	GameTabType.EMPLOYEES,
	GameTabType.COMPLEX,
	GameTabType.MAP,
	GameTabType.RESEARCH,
]);

const Main: React.SFC<MainProps> = (props) => {
	const { worldState } = useContext(AppContext);

	return (
		<>
			<main className="column is-full-height pt-6">
				{/* <DebugBox /> */}
				{worldState.activeTab === GameTabType.HOME && <HomeTab />}
				{worldState.activeTab === GameTabType.LETTERS && <LettersTab />}
				{worldState.activeTab === GameTabType.SHOP && <ShopTab />}
				{worldState.activeTab === GameTabType.EMPLOYEES && <EmployeesTab />}
				{worldState.activeTab === GameTabType.COMPLEX && <ComplexTab />}
				{worldState.activeTab === GameTabType.RESEARCH && <ResearchTab />}
				{worldState.activeTab === GameTabType.MAP && <PrelifeMapTab />}
				{!implementedTabs.contains(worldState.activeTab) && (
					<span>
						tab {worldState.activeTab} not implemented in main, check array
					</span>
				)}
			</main>
		</>
	);
};

export default Main;
