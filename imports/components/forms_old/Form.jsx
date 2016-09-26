import React from 'react';

import { TextInput } from './elements/TextInput.jsx';
import { AutoSuggestInput } from './elements/AutoSuggestInput.jsx';
import { PasswordInput } from './elements/PasswordInput.jsx';
import { SelectInput } from './elements/SelectInput.jsx';

import './Form.scss';


export class Form extends React.Component {

	constructor(props) {
		super(props);

		let initialState = {};
		for (i in this.props.formInputs) {

			const n = this.props.formInputs[i];
			if (['gap','divider'].indexOf(n.type) > -1) continue;

			initialState[n.name] = {
				'value':'',
				'isValid':false,
			}
		}
		this.state = initialState;
	}

	handleInputChange(result) {
		this.setState({
			[result.name]: {
				'value': result.value,
				'isValid': result.isValid
			}
		}, () => {
			// This is an optional callback that can be passed from the container to the Form component
			if (typeof this.props.handleOnChange === 'function') this.props.handleOnChange(this.state);
		});
	}

	handleServerError(name, message) {
		this.refs[name].handleServerError(message);
	}

	handleSubmit(e) {
		e.preventDefault();

		for (i in this.state) {
			if (Array.isArray(this.state[i].value)) { // This is to support the AutoSuggestInput which returns an array
				this.refs[i].processInput(this.state[i].value[0].trim());
			} else {
				this.refs[i].processInput(this.state[i].value.trim());
			}
		}

		let isFormValid = false;
		for (i in this.state) {
			if (this.state[i].isValid) {
				isFormValid = true;
			} else {
				isFormValid = false;
				break;
			}
		}

		if (isFormValid) {
			// package up and call the container submit method
			let values = {};
			for (i in this.state) {
				let value = null;
				if (Array.isArray(this.state[i].value)) { // This is to support the AutoSuggestInput which returns an array
					values[i] = this.state[i].value[0];
				} else {
					values[i] = this.state[i].value;
				}
			}

			this.props.handleSubmit(values);
		}
	}

	render() {

		return(
			<form ref="formElement" onSubmit={this.handleSubmit.bind(this)} className="cmptFormsForm">
				{this.props.formInputs.map((inputProps, n) => {
					switch (inputProps.type) {
						case 'textInput': return <TextInput
													inputProps={inputProps}
													handleInputChange={this.handleInputChange.bind(this)}
													key={n}
													ref={inputProps.name}
												/>
						case 'autoSuggestInput': return <AutoSuggestInput
															inputProps={inputProps}
															handleInputChange={this.handleInputChange.bind(this)}
															key={n}
															ref={inputProps.name}
														/>
						case 'createPasswordInput': return <PasswordInput
																infoBar={true}
																inputProps={inputProps}
																handleInputChange={this.handleInputChange.bind(this)}
																key={n}
																ref={inputProps.name}
															/>
						case 'passwordInput': return <PasswordInput
														infoBar={false}
														inputProps={inputProps}
														handleInputChange={this.handleInputChange.bind(this)}
														key={n}
														ref={inputProps.name}
													/>
						case 'divider': return <hr />
						case 'gap': return <div className="gap"></div>
					}
				})}

				<button type="submit" ref="submitButton">{this.props.buttonText}</button>
			</form>
		);
	}

}
