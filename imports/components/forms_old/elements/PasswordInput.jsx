import React from 'react';

import InputPassword from 'react-ux-password-field';
import { validate } from '../FormValidators.js';


export class PasswordInput extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			'value': this.props.inputProps.value,
			'error': '',
		};

		this.isRequired = (this.props.inputProps.validationRules.indexOf('required') > -1) ? true:false;
	}

	processInput(value) {
		const error = validate(value, this.props.inputProps.validationRules);

		this.setState({'value':value, 'error':error}, () => {
			this.props.handleInputChange({
				'name':this.props.inputProps.name,
				'value':value,
				'isValid': (!this.state.error) ? true:false
			});
		});
	}

	handleOnChange(value) {
		this.processInput(value);
	}

	render() {

		return(
			<fieldset>
				<label htmlFor={this.props.inputProps.name}>
					{this.props.inputProps.label} {(this.isRequired ? "*" : '' )}
				</label>
				<div className="errorField" style={{'display': (this.state.error === '') ? 'none':'block'}}>
					{this.state.error}
				</div>
				<InputPassword
					name={this.props.inputProps.name}
					placeholder={this.props.inputProps.placeholder}
					maxLength="128"
					autoComplete="off"
					unMaskTime={700}
					infoBar={this.props.infoBar}
					ref={this.props.inputProps.name}
					onChange={this.handleOnChange.bind(this)}
				/>
			</fieldset>
		);
	}
}
