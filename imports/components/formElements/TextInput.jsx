import React from 'react';
import FontAwesome from 'react-fontawesome';


import '/imports/stylesheets/base-styles.scss';


export class TextInput extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			'originalValue': this.props.value,
			'value': this.props.value,
		}

		this.__typingTimer;
	}

	onChangeHandler(e) {
		e.preventDefault();
		this.setState({'value': e.target.value});
	}




	__validationCallbackExists() {
		// This is called in the render function to see if a callback function has been supplied via props.
		// If so, start a validation watcher. Else, ignore.
		return (this.props.hasOwnProperty('validationCallback')) ? true : false;
	}
	__validationWatcher(e) {
		// Called by the `keyUp` event of the input in the render function, this function creates a timer so
		// that validation doesn't happen in real-time. It's intended to wait for a user to stop typing before
		// validation. Real-time validation can be annoying when you haven't finished typing.

		e.preventDefault();

		//-- If there is a current error, run validationCallback instantly on keyup
		//-- Else if there is no error, set a timer to run validationCallback (this.props.doneTypingInterval)

		clearTimeout(this.__typingTimer);
		if (this.props.errorMessage) {
			this.validationCallback();
		} else {
			this.__typingTimer = setTimeout(this.validationCallback.bind(this), this.props.doneTypingInterval);
		}
	}
	validationCallback() {
		// This is a function passed by the parent form to do validation on this entered data.
		// It has been pushed up to the form so the form layout can handle placement of erros and feedback.
		this.props.validationCallback(this.props.name, this.refs.input.value);
	}




	getValue() {
		// This is called by the parent form via `this.refs.[component].input.getValue()`.
		// getValue() is usually called during the onSubmit handler of the parent form and
		// in case the user hits the ENTER key before this input's timer expires and validations begin,
		// we kill the timer so we don't double-up on the validation that onSubmit will also do.
		clearTimeout(this.__typingTimer);
		return this.state.value;
	}
	hasValueChanged() {
		// This is called by the parent form via `this.refs.[component].input.hasChanged()`.
		// It is to help determine if data from this input should be submitted or not.

		return (this.state.value === this.state.originalValue) ? false : true;
	}



	render() {
		return(
			<div>
				<div>{this.props.errorMessage}</div>
				<input
					ref="input"
					type="text"
					name={this.props.name}
					value={this.state.value}
					onChange={this.onChangeHandler.bind(this)}
					autoComplete='off'
					onKeyUp={this.__validationCallbackExists() ? this.__validationWatcher.bind(this) : null}
				/>
			</div>
		);
	}
}
TextInput.propTypes = {
	name: React.PropTypes.string.isRequired,
	value: React.PropTypes.string,
	validationCallback: React.PropTypes.func,
	errorMessage: React.PropTypes.string,
	doneTypingInterval: React.PropTypes.number,
}
TextInput.defaultProps = {
	doneTypingInterval: 1000,
}
