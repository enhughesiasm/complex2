import neutrals from "./data/neutral.json";
import positive_basic from "./data/positive_basic.json";
import positive_rare from "./data/positive_rare.json";
import negative_basic from "./data/negative_basic.json";
import negative_rare from "./data/negative_rare.json";
import nouns_basic from "./data/nouns_basic.json";
import nouns_rare from "./data/nouns_rare.json";
import preferences from "./data/preferences.json";
import adverbs from "./data/adverbs.json";
import { chooseRandomElement } from "../../../../components/shared/functions";

export default function generateTraitName(
	type: string,
	nuanceFraction: number
) {
	let name = "NONE";

	switch (type) {
		case "neutral":
			name = chooseRandomElement(neutrals);
			break;
		case "positive_basic":
			name = chooseRandomElement(positive_basic);
			break;
		case "positive_rare":
			name = chooseRandomElement(positive_rare);
			break;
		case "negative_basic":
			name = chooseRandomElement(negative_basic);
			break;
		case "negative_rare":
			name = chooseRandomElement(negative_rare);
			break;
		case "preferences_basic":
			name =
				chooseRandomElement(preferences) +
				" " +
				chooseRandomElement(nouns_basic);
			break;
		case "preferences_rare":
			name =
				chooseRandomElement(preferences) +
				" " +
				chooseRandomElement(nouns_rare);
			break;

		default:
			console.error("trait generator not implemented; level: ", type);
			name = "ERROR";
			break;
	}

	return (getNuance(nuanceFraction) + " " + name).trim().toUpperCase();
}

function getNuance(nuanceFraction: number): string {
	if (nuanceFraction > 1) nuanceFraction = 1;
	if (nuanceFraction < 0) nuanceFraction = 0;

	let nuance = "";

	if (Math.random() < nuanceFraction) {
		nuance = chooseRandomElement(adverbs);
	}

	return nuance;
}
