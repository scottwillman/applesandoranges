import React from 'react';
import ReactDOM from 'react-dom';

import "./BigSingleInputForm.scss";


export class BigSingleInputForm extends React.Component {

	onSubmitHandle(e) {
		e.preventDefault();
		this.props.onSubmitHandle(this.refs.bigInput.value);
	}

	shouldShowError() {
		return this.props.error !== null ? 'block':'none';
	}

	render() {
		return (
			<div className="cmptBigSingleInputForm">
				{this.props.errors}
				<form onSubmit={this.onSubmitHandle.bind(this)}>
					<h3>{this.props.label}</h3>
					<input type="text" name="bigInput" placeholder={this.props.placeholder} ref="bigInput" maxLength={this.props.maxLength} />
					<div className="cmptBigSingleInputError" style={{'display':this.shouldShowError()}} ref="bigInputError">{this.props.error}</div>
				</form>
			</div>
		)
	}
}
BigSingleInputForm.defaultProps = {
	maxLength: 64,
	errorEmpty: 'Oooops! Please enter something.',
}
