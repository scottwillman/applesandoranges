import React from 'react';

import { validate } from '../FormValidators.js';


export class TextInput extends React.Component {
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
				'isValid': (!this.state.error) ? true:false,
			});
		});
	}

	handleServerError(error) {
		this.setState({'error':error}, () => {
			this.props.handleInputChange({
				'name':this.props.inputProps.name,
				'value':this.state.value,
				'isValid': false,
			});
		})
	}

	handleOnChange(e) {
		e.preventDefault();
		this.processInput(e.target.value);
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
				<input
					type="text"
					name={this.props.inputProps.name}
					autoComplete="off"
					placeholder={this.props.inputProps.placeholder}
					value={this.state.value}
					maxLength="128"
					onChange={this.handleOnChange.bind(this)}
				/>
			</fieldset>
		);
	}
}
