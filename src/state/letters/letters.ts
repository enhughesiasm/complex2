export enum LetterTypes {
	Dummy,
	Intro,
	UnlockEmployees,
}

const letterDefinitions = [
	{
		type: LetterTypes.Intro,
		from: "Management",
		subject: "Welcome",
	},
	{
		type: LetterTypes.UnlockEmployees,
		from: "The Shopkeeper",
		subject: "An idea for you...",
	},
];

export default letterDefinitions;
