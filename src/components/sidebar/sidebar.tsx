import React from 'react';
import SidebarFooter from '../footer/footer';
import Title from './title';
import SidebarNav from './sidebar_nav';

interface SidebarProps {}

const Sidebar: React.SFC<SidebarProps> = (props) => (
	<>
		<section className='column is-one-fifth has-background-dark has-text-white is-full-height'>
			<Title />
			<SidebarNav />
			<SidebarFooter />
		</section>
	</>
);

export default Sidebar;
