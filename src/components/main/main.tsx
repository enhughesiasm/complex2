import React, { useContext } from "react";
import HomeTab from "../tabs/home/home_tab";
import AppContext from "../../state/app_context";
import LettersTab from "../tabs/letters/letters_tab";
import { GameTabType } from "../../state/game_tabs";
import ShopTab from "../tabs/shop/shop_tab";
import Enumerable from "linq";
import EmployeesTab from "../tabs/employees/employees_tab";
import StorageTab from "../tabs/storage/storage_tab";

interface MainProps {}

// TK remove this later
const implementedTabs = Enumerable.from([
	GameTabType.HOME,
	GameTabType.LETTERS,
	GameTabType.SHOP,
	GameTabType.EMPLOYEES,
	GameTabType.STORAGE,
]);

const Main: React.SFC<MainProps> = (props) => {
	const { worldState } = useContext(AppContext);

	return (
		<>
			<main className="column is-full-height">
				{worldState.activeTab === GameTabType.HOME && <HomeTab />}
				{worldState.activeTab === GameTabType.LETTERS && <LettersTab />}
				{worldState.activeTab === GameTabType.SHOP && <ShopTab />}
				{worldState.activeTab === GameTabType.EMPLOYEES && <EmployeesTab />}
				{worldState.activeTab === GameTabType.STORAGE && <StorageTab />}
				{!implementedTabs.contains(worldState.activeTab) && (
					<span>tab {worldState.activeTab} not implemented in main</span>
				)}
			</main>
		</>
	);
};

export default Main;
