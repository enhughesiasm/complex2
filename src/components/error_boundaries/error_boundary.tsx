import React from 'react';

interface IErrorBoundaryProps {}

interface IErrorBoundaryState {
	hasCaughtError: boolean;
	message: string;
}

export default class ErrorBoundary extends React.Component<
	IErrorBoundaryProps,
	IErrorBoundaryState
> {
	constructor(props: any) {
		super(props);
		this.state = { hasCaughtError: false, message: '' };
	}

	componentDidCatch(error: any) {
		console.error(error);
		this.setState({ hasCaughtError: true, message: error.message });
	}

	render() {
		if (this.state.hasCaughtError) {
			return (
				<div className='has-text-centered'>
					<p>Sorry! Something went wrong.</p>
					<p className='smallPrint'>
						(If this persists after refresh, it might help if you
						let Neil know.)
					</p>
					<br />
					<br />
					<p className='error' style={{ color: 'red' }}>
						{this.state.message}
					</p>
				</div>
			);
		}
		return this.props.children;
	}
}
