import moment, { Moment } from "moment";
import { GameTabType } from "./game_tabs";
import { targets, ITarget } from "./targets/targets";
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
import LettersManager from "./letters/letters_manager";
import PrelifeMap from "./prelife_map/prelife_map";
import Research from "./research/research";
import researchTree from "./data/research_tree";

export default class WorldState {
	debug: boolean = false; // overwritten in load_state if necessary

	paused: boolean = false;

	activeTab: GameTabType = GameTabType.HOME;

	now: Moment = moment();

	favours: number = 0;
	favoursSpent: number = 0;
	totalTraitsProduced: number = 0;
	totalTraitsWasted: number = 0;

	processList: Array<ITickProcess> = initialProcesses;

	worldFlags: Flags = new Flags();
	worldOperations: WorldOperations = new WorldOperations();
	playerAttributes: PlayerAttributes = new PlayerAttributes();

	letterManager: LettersManager = new LettersManager();
	deliveryManager: DeliveryManager = new DeliveryManager();

	inventory: Inventory = new Inventory();
	shop: Shop = new Shop();
	targets: Array<ITarget> = targets;

	traitGenerator: TraitGenerator = new TraitGenerator();

	employees: Employees = new Employees();

	storage: TraitStorage = new TraitStorage();

	prelifeMap: PrelifeMap = new PrelifeMap();

	research: Research = new Research(researchTree);

	spendFavours(amount: number): boolean {
		if (this.favours >= amount) {
			this.favours -= amount;
			this.favoursSpent += amount;
			return true;
		}
		console.error(
			`Tried to spend ${amount} favours, only have ${this.favours}. Check the stack - missing a check somewhere!`
		);
		return false;
	}

	[index: string]: any;
}
