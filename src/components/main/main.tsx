import React, { useContext } from "react";
import HomeTab from "../tabs/home/home_tab";
import AppContext from "../../state/app_context";
import LettersTab from "../tabs/letters/letters_tab";
import { GameTabType } from "../../state/game_tabs";
import ShopTab from "../tabs/shop/shop_tab";
import Enumerable from "linq";
import EmployeesTab from "../tabs/employees/employees_tab";
import StorageTab from "../tabs/storage/storage_tab";
import FontAwesome from "../shared/font_awesome";
import PrelifeMapTab from "../prelife_map/prelife_map_tab";

interface MainProps {}

// TK remove this later
const implementedTabs = Enumerable.from([
	GameTabType.HOME,
	GameTabType.LETTERS,
	GameTabType.SHOP,
	GameTabType.EMPLOYEES,
	GameTabType.STORAGE,
	GameTabType.MAP,
]);

const Main: React.SFC<MainProps> = (props) => {
	const { worldState } = useContext(AppContext);

	return (
		<>
			<main className="column is-full-height">
				<div className="notification is-dark">
					{" "}
					<div className="tile is-child box is-size-7 is-paddingless">
						{/* TK move this to a much better place in the UI; also maybe it doesn't make sense */}
						{/* TK maybe a big ol' configuration screen? with many similar options */}
						<div>
							Minimum Delivery Batch Size:{" "}
							{worldState.playerAttributes.minimumDeliveryBatchSize}
							<span
								className="buttons"
								style={{ display: "inline-flex", marginLeft: ".3rem" }}
							>
								<button
									className="button is-rounded is-info is-super-small"
									disabled={
										worldState.playerAttributes.minimumDeliveryBatchSize === 1
									}
									onClick={() =>
										worldState.playerAttributes.minimumDeliveryBatchSize--
									}
								>
									<FontAwesome icon="minus" />
								</button>
								{/* TK typable amount... if this ends up making it into the game */}
								<button
									className="button is-rounded is-info is-super-small"
									disabled={
										worldState.playerAttributes.minimumDeliveryBatchSize ===
										worldState.playerAttributes.deliveryCarryCapacity
									}
									onClick={() =>
										worldState.playerAttributes.minimumDeliveryBatchSize++
									}
								>
									<FontAwesome icon="plus" />
								</button>
							</span>
						</div>
						<div>
							Rarity Level: {worldState.playerAttributes.maximumRarityLevel}
							<span
								className="buttons"
								style={{ display: "inline-flex", marginLeft: ".3rem" }}
							>
								<button
									className="button is-rounded is-info is-super-small"
									disabled={
										worldState.playerAttributes.maximumRarityLevel === 0
									}
									onClick={() =>
										worldState.playerAttributes.maximumRarityLevel--
									}
								>
									<FontAwesome icon="minus" />
								</button>
								{/* TK typable amount... if this ends up making it into the game */}
								<button
									className="button is-rounded is-info is-super-small"
									disabled={
										worldState.playerAttributes.maximumRarityLevel === 20
									}
									onClick={() =>
										worldState.playerAttributes.maximumRarityLevel++
									}
								>
									<FontAwesome icon="plus" />
								</button>
							</span>
						</div>
					</div>
				</div>
				{worldState.activeTab === GameTabType.HOME && <HomeTab />}
				{worldState.activeTab === GameTabType.LETTERS && <LettersTab />}
				{worldState.activeTab === GameTabType.SHOP && <ShopTab />}
				{worldState.activeTab === GameTabType.EMPLOYEES && <EmployeesTab />}
				{worldState.activeTab === GameTabType.STORAGE && <StorageTab />}
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
