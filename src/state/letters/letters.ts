import moment from 'moment';

export enum LettersContents {
	Dummy,
	Intro,
}

export interface ILetter {
	from: string;
	subject: string;

	available: boolean;
	unread: boolean;
	receivedAt?: moment.Moment;
	contents: LettersContents;
}

export default class Letter implements ILetter {
	available: boolean = false;
	unread: boolean = true;

	from: string = 'Person';
	subject: string = 'A Subject';
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
		this.available = available;
		this.unread = unread;
		this.receivedAt = receivedAt;
		this.contents = contents;
		this.from = from;
		this.subject = subject;
	}
}
