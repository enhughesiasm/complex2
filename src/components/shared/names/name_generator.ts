import adjectives from "./adjectives";

import { uniqueNamesGenerator, names, Config } from "unique-names-generator";

const config: Config = {
	dictionaries: [adjectives, names],
	length: 2,
	separator: "' ",
	style: "capital",
};

export function generatePersonName(): string {
	return "'" + uniqueNamesGenerator(config);
}
