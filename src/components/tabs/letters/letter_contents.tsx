import React from 'react';
import { LettersContents } from '../../../state/letters/letters';
import DummyLetter from './letter_texts/dummy_letter';
import IntroLetter from './letter_texts/intro_letter';

export interface ILetterContentsProps {
	contents: LettersContents;
}

const LetterContents: React.FC<ILetterContentsProps> = ({ contents }) => (
	<div className='tile is-child is-7 paper letter'>
		{contents === LettersContents.Dummy && <DummyLetter />}
		{contents === LettersContents.Intro && <IntroLetter />}
	</div>
);

export default LetterContents;
