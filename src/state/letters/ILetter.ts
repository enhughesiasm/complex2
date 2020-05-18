import { Moment } from "moment";
import { LetterTypes } from "./letters";

export interface ILetter {
	id: string;

	from: string;
	subject: string;

	available: boolean;
	unread: boolean;
	receivedAt?: Moment;
	type: LetterTypes;
}
