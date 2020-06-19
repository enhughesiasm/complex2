import { IResearchItem } from "./IResearchItem";
import { ensure } from "../../components/shared/functions";
import WorldState from "../world_state";

export default class Research {
	tree: IResearchItem;
	currentId?: string;
	hoverId?: string;

	maxDepth?: number;
	maxWidth?: number;

	constructor(tree: IResearchItem) {
		this.tree = tree;
	}

	getMaxDepth(): number {
		if (this.maxDepth) return this.maxDepth;

		const getDepth = (node: IResearchItem): number =>
			1 +
			(node.children.length > 0
				? Math.max(...node.children.map((c) => getDepth(c)))
				: 0);

		this.maxDepth = getDepth(this.tree);

		return this.maxDepth;
	}

	setHover(node: IResearchItem | undefined) {
		this.hoverId = node?.research_id;
	}

	clearResearch(): void {
		this.currentId = undefined;
	}

	setResearch(id: string, worldState: WorldState): void {
		const node = this.getItem(id);

		if (node.progressPercent >= 100 || node.completed) return; // TK handle repeatable research
		if (!node.prerequisitesMet(worldState)) return;

		this.currentId = node.research_id;
	}

	completeCurrentResearch(worldState: WorldState): void {
		if (this.currentId) {
			const node = this.getItem(this.currentId);

			node.onComplete(worldState);
			node.progressPercent = 100;
			node.completed = true;
			this.currentId = undefined;
		}
	}

	markComplete(id: string, worldState: WorldState): void {
		if (!id) return;

		const node = this.getItem(id);
		if (!node) return;

		node.completed = true;
		node.costRemaining = 0;
		node.progressPercent = 100;
		node.onComplete(worldState);
	}

	getItem(id: string): IResearchItem {
		if (!id) {
			console.error(`missing id in getItem: ${id}`);
		}

		return ensure(this.searchTree(id, this.tree));
	}

	/** recursively searches through a research tree given a start node, and returns the matching id, or nothing */
	searchTree(id: string, node: IResearchItem): IResearchItem | undefined {
		if (node.research_id === id) {
			return node;
		} else if (node.children.length > 0) {
			let result = undefined;
			for (let i = 0; i < node.children.length; i++) {
				result = this.searchTree(id, node.children[i]);
				if (result !== undefined) {
					break;
				}
			}

			return result;
		}
		return undefined;
	}

	isComplete(id: string): boolean {
		return this.getItem(id).progressPercent >= 100;
	}
}
