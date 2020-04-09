import React from 'react';

import bulmaQuickview from 'bulma-extensions/bulma-quickview/dist/js/bulma-quickview';

interface PatchNotesProps {
	patchNotesActive: boolean;
	onTogglePatchNotes(): any;
}

export default class PatchNotes extends React.PureComponent<PatchNotesProps> {
	componentDidMount() {
		bulmaQuickview.attach();
	}

	render() {
		return (
			<div
				id='quickviewPatchNotes'
				className={
					'patchNotes quickview' +
					(this.props.patchNotesActive ? ' is-active' : '')
				}>
				<header
					className='quickview-header notification is-warning'
					onClick={this.props.onTogglePatchNotes}>
					<p className='title'>things have changed...</p>
					<span
						className='delete is-large'
						data-dismiss='quickview'></span>
				</header>
				<div
					className='quickview-body'
					style={{ padding: '2rem 1rem' }}>
					<div className='quickview-block'>
						<p className='subtitle'>v0.0.1 - 2020</p>
						<ul>
							<li>initial project scaffold</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}
