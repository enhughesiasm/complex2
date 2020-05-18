import { GameTabType } from "./game_tabs";
import { targets, ITarget } from "./targets/targets";
import { ITraitGenerator } from "./traits/generator/ITraitGenerator";
import TraitGenerator from "./traits/generator/trait_generator";
import Inventory from "./inventory/inventory";
import Flags from "./world_flags";
import WorldOperations from "./world_operations";
import PlayerAttributes from "./player_attributes";
import TraitStorage from "./trait_storage/trait_storage";
import Shop from "./shop/shop";
import DeliveryManager from "./delivery/delivery_manager";
import { ITickProcess } from "./tick/ITickProcess";
import initialProcesses from "./tick/initial_processes";
import Employees from "./employees/employee_manager";
import LettersManager from "./letters/letter_manager";

export default class WorldState {
	debug: boolean = false; // overwritten in load_state if necessary
	activeTab: GameTabType = GameTabType.HOME;

	favours: number = 0;
	totalTraitsProduced: number = 0;

	processList: Array<ITickProcess> = initialProcesses;

	worldFlags: Flags = new Flags();
	worldOperations: WorldOperations = new WorldOperations();
	playerAttributes: PlayerAttributes = new PlayerAttributes();

	letterManager: LettersManager = new LettersManager();
	deliveryManager: DeliveryManager = new DeliveryManager();

	inventory: Inventory = new Inventory();
	shop: Shop = new Shop();
	targets: Array<ITarget> = targets;

	traitGenerator: ITraitGenerator = new TraitGenerator();

	employees: Employees = new Employees();

	storage: TraitStorage = new TraitStorage();

	[index: string]: any;
}
