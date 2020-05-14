import moment from "moment";
import { create_guid } from "../../components/shared/functions";

export enum LettersContents {
	Dummy,
	Intro,
	UnlockEmployees,
}

export interface ILetter {
	id: string;

	from: string;
	subject: string;

	available: boolean;
	unread: boolean;
	receivedAt?: moment.Moment;
	contents: LettersContents;
}

export default class Letter implements ILetter {
	id: string;

	available: boolean = false;
	unread: boolean = true;

	from: string = "Person";
	subject: string = "A Subject";
	receivedAt: moment.Moment | undefined;
	contents: LettersContents = LettersContents.Dummy;

	constructor(
		available: boolean,
		unread: boolean,
		contents: LettersContents,
		from: string,
		subject: string,
		receivedAt?: moment.Moment
	) {
		this.id = create_guid();
		this.available = available;
		this.unread = unread;
		this.receivedAt = receivedAt;
		this.contents = contents;
		this.from = from;
		this.subject = subject;
	}
}
