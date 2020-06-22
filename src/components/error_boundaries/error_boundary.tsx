import React from "react";

interface IErrorBoundaryProps {}

interface IErrorBoundaryState {
	hasCaughtError: boolean;
	message: string;
	stack: string | undefined;
}

export default class ErrorBoundary extends React.Component<
	IErrorBoundaryProps,
	IErrorBoundaryState
> {
	constructor(props: any) {
		super(props);
		this.state = { hasCaughtError: false, message: "", stack: undefined };
	}

	componentDidCatch(error: Error) {
		console.error(error);
		this.setState({
			hasCaughtError: true,
			message: error.message,
			stack: error.stack,
		});
	}

	render() {
		if (this.state.hasCaughtError) {
			return (
				<div className="has-text-centered">
					<p>Sorry! Something went wrong.</p>
					<p className="smallPrint">
						(If this persists after refresh, it might help if you let Neil
						know.)
					</p>
					<br />
					<br />
					<p className="error" style={{ color: "red" }}>
						{this.state.message}
					</p>
					<p className="smallPrint mt-6" style={{ color: "grey" }}>
						{this.state.stack}
					</p>
				</div>
			);
		}
		return this.props.children;
	}
}
