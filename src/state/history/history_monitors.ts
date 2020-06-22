import WorldState from "../world_state";

export interface IHistoryMonitor {
	name: string;
	display: string;
	func(worldState: WorldState): number;
}

interface IHistoryMonitorTypes {
	[index: string]: string;
}

export const historyMonitorTypes: IHistoryMonitorTypes = {
	Ingredients0: "Ingredients_Stored_Basic",
	Ingredients1: "Ingredients_Stored_Common",
	Ingredients2: "Ingredients_Stored_Uncommon",
	Ingredients3: "Ingredients_Stored_Rare",
	Ingredients4: "Ingredients_Stored_Special",
	Ingredients5: "Ingredients_Stored_Legendary",
	Ingredients6: "Ingredients_Stored_Secret",
	Traits0: "Traits_Stored_Basic",
	Traits1: "Traits_Stored_Common",
	Traits2: "Traits_Stored_Uncommon",
	Traits3: "Traits_Stored_Rare",
	Traits4: "Traits_Stored_Special",
	Traits5: "Traits_Stored_Legendary",
	Traits6: "Traits_Stored_Secret",
	DeliveredTraits0: "Traits_Delivered_Basic",
	DeliveredTraits1: "Traits_Delivered_Common",
	DeliveredTraits2: "Traits_Delivered_Uncommon",
	DeliveredTraits3: "Traits_Delivered_Rare",
	DeliveredTraits4: "Traits_Delivered_Special",
	DeliveredTraits5: "Traits_Delivered_Legendary",
	DeliveredTraits6: "Traits_Delivered_Secret",
};

// TK generate this more smartly without all the repetition
const historyMonitors: Array<IHistoryMonitor> = [
	{
		name: historyMonitorTypes.Ingredients0,
		func: (worldState: WorldState) => worldState.inventory.ingredients.get(0),
		display: "Basic Ingredients",
	},
	{
		name: historyMonitorTypes.Ingredients1,
		func: (worldState: WorldState) => worldState.inventory.ingredients.get(1),
		display: "Common Ingredients",
	},
	{
		name: historyMonitorTypes.Ingredients2,
		func: (worldState: WorldState) => worldState.inventory.ingredients.get(2),
		display: "Uncommon Ingredients",
	},
	{
		name: historyMonitorTypes.Ingredients3,
		func: (worldState: WorldState) => worldState.inventory.ingredients.get(3),
		display: "Rare Ingredients",
	},
	{
		name: historyMonitorTypes.Ingredients4,
		func: (worldState: WorldState) => worldState.inventory.ingredients.get(4),
		display: "Special Ingredients",
	},
	{
		name: historyMonitorTypes.Ingredients5,
		func: (worldState: WorldState) => worldState.inventory.ingredients.get(5),
		display: "Legendary Ingredients",
	},
	{
		name: historyMonitorTypes.Ingredients6,
		func: (worldState: WorldState) => worldState.inventory.ingredients.get(6),
		display: "Secret Ingredients",
	},
	{
		name: historyMonitorTypes.Traits0,
		func: (worldState: WorldState) => worldState.storage.stored.get(0),
		display: "Basic",
	},
	{
		name: historyMonitorTypes.Traits1,
		func: (worldState: WorldState) => worldState.storage.stored.get(1),
		display: "Common",
	},
	{
		name: historyMonitorTypes.Traits2,
		func: (worldState: WorldState) => worldState.storage.stored.get(2),
		display: "Uncommon",
	},
	{
		name: historyMonitorTypes.Traits3,
		func: (worldState: WorldState) => worldState.storage.stored.get(3),
		display: "Rare",
	},
	{
		name: historyMonitorTypes.Traits4,
		func: (worldState: WorldState) => worldState.storage.stored.get(4),
		display: "Special",
	},
	{
		name: historyMonitorTypes.Traits5,
		func: (worldState: WorldState) => worldState.storage.stored.get(5),
		display: "Legendary",
	},
	{
		name: historyMonitorTypes.Traits6,
		func: (worldState: WorldState) => worldState.storage.stored.get(6),
		display: "Secret",
	},
	{
		name: historyMonitorTypes.DeliveredTraits0,
		func: (worldState: WorldState) => worldState.shop.received.get(0),
		display: "Basic",
	},
	{
		name: historyMonitorTypes.DeliveredTraits1,
		func: (worldState: WorldState) => worldState.shop.received.get(1),
		display: "Common",
	},
	{
		name: historyMonitorTypes.DeliveredTraits2,
		func: (worldState: WorldState) => worldState.shop.received.get(2),
		display: "Uncommon",
	},
	{
		name: historyMonitorTypes.DeliveredTraits3,
		func: (worldState: WorldState) => worldState.shop.received.get(3),
		display: "Rare",
	},
	{
		name: historyMonitorTypes.DeliveredTraits4,
		func: (worldState: WorldState) => worldState.shop.received.get(4),
		display: "Special",
	},
	{
		name: historyMonitorTypes.DeliveredTraits5,
		func: (worldState: WorldState) => worldState.shop.received.get(5),
		display: "Legendary",
	},
	{
		name: historyMonitorTypes.DeliveredTraits6,
		func: (worldState: WorldState) => worldState.shop.received.get(6),
		display: "Secret",
	},
];

export default historyMonitors;
