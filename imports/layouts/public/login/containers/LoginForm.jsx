import React from 'react';

import { BaseForm } from '/imports/lib/BaseForm.jsx';

import { validate } from '/imports/lib/validate.js';
// import { Genders } from '/imports/lib/choices.js';


export class LoginForm extends BaseForm {

	constructor(props) {
		super(props);

		this.state = {
			'formMessage':'',
			'inputs': {
				'email': {
					'value': '',
					'validations': ['required', 'email'],
					'error': '',
				},
				'password': {
					'value': '',
					'validations': ['required'],
					'error': '',
				},
			}
		};
	}

	onChangeHandler(e) {
		e.preventDefault();

		this._updateInput(e.target.name, e.target.value);
	}

	onSubmitHandler(e) {
		e.preventDefault();

		const isValid = this._validateAllInputs();

		// this._submitForm('children.insert', this.onSuccess);
		if (isValid) {
			Meteor.loginWithPassword(this.state.inputs.email.value, this.state.inputs.password.value, (error) => {
				if (error) {
					console.log(error);
				} else {
					this.context.router.push('/choose');
				}
			});
		}
	}

	onSuccess() {
		console.log('whoopee!');
	}

	render() {

		return (
			<form onSubmit={this.onSubmitHandler.bind(this)}>
				<div>{this.state.formMessage}</div>

				<fieldset>
					<label htmlFor="email">Email</label>
					<div className="error-message float-right">{this.state.inputs.email.error}</div>
					<input type="text" value={this.state.inputs.email.value} name="email" onChange={this.onChangeHandler.bind(this)} autoComplete='off' />
				</fieldset>

				<fieldset>
					<label htmlFor="password">Password</label>
					<div className="error-message float-right">{this.state.inputs.password.error}</div>
					<input type="password" value={this.state.inputs.password.value} name="password" onChange={this.onChangeHandler.bind(this)} autoComplete='off' />
				</fieldset>

				<button className="btn"><span>Sign In</span></button>
			</form>
		);
	}
}
LoginForm.contextTypes = {
	router: React.PropTypes.object.isRequired,
}
