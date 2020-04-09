import React from 'react';

interface IFontAwesomeProps {
	icon: string;
	style?: object;
	status?: string; // warning, danger, success, etc
	size?: string;
}

const FontAwesome: React.FC<IFontAwesomeProps> = props => (
	<span
		className={
			'icon ' +
			(props.status ? ' has-text-' + props.status : '') +
			(props.size ? ' is-' + props.size : '')
		}>
		<i className={'fas fa-' + props.icon} style={props.style}></i>
	</span>
);

export default FontAwesome;
