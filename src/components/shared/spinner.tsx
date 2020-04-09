import React from 'react';

interface ISpinnerProps{	
	style?: object,
	status?: string, // warning, danger, success, etc
	spacing?: string
}

const Spinner:React.FC<ISpinnerProps> = (props) => 
	<span className={'icon ' + (props.status ? (' has-text-' + props.status) : '') + (props.spacing ? (' is-' + props.spacing) : '')}>
		<i className={'fas fa-spinner fa-pulse'} style={props.style}></i>
	</span>;

export default Spinner;

