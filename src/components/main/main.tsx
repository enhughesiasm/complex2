import React from 'react';
import HandsTab from '../tabs/hands/hands_tab';

interface MainProps {}

const Main: React.SFC<MainProps> = (props) => (
	<>
		<main className='column is-full-height'>
			<HandsTab />
		</main>
	</>
);

export default Main;
