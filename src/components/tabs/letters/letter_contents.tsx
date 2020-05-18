import React from "react";
import { LetterTypes } from "../../../state/letters/letters";
import DummyLetter from "./letter_texts/dummy_letter";
import IntroLetter from "./letter_texts/intro_letter";
import UnlockEmployeesLetter from "./letter_texts/unlock_employees_letter";

export interface ILetterContentsProps {
	contents: LetterTypes;
}

const LetterContents: React.FC<ILetterContentsProps> = ({ contents }) => (
	<div className="tile is-child is-7 paper letter">
		{contents === LetterTypes.Dummy && <DummyLetter />}
		{contents === LetterTypes.Intro && <IntroLetter />}
		{contents === LetterTypes.UnlockEmployees && <UnlockEmployeesLetter />}
	</div>
);

export default LetterContents;
