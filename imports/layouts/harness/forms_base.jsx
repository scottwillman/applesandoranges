import React from 'react';

import { BaseForm } from '/imports/lib/BaseForm.jsx';

import { validate } from '/imports/lib/validate.js';
import { Genders } from '/imports/lib/choices.js';


export class FormHarness extends BaseForm {

	constructor(props) {
		super(props);

		this.state = {
			'formMessage':'',
			'inputs': {
				'name': {
					'value': '',
					'validations': ['required', 'maxChars128'],
					'error': '',
				},
				'gender': {
					'value': 'male',
					'validations': ['required'],
					'error': '',
				},
				'birthdate': {
					'value': '',
					'validations': ['required','date'],
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

		if (isValid) this._submitForm('children.insert', this.onSuccess);
	}

	onSuccess() {
		console.log('whoopee!');
	}

	render() {

		return (
			<form onSubmit={this.onSubmitHandler.bind(this)}>
				<div>{this.state.formMessage}</div>

				<label htmlFor="name">Name</label>
				<input type="text" value={this.state.inputs.name.value} name="name" onChange={this.onChangeHandler.bind(this)} autoComplete='off' />
				<div>{this.state.inputs.name.error}</div>

				<label htmlFor="gender">Gender</label>
				<select name="gender" onChange={this.onChangeHandler.bind(this)}>
					{Genders.map((g, n) => {
						return <option key={n} value={g}>{g}</option>;
					})}
				</select>
				<div>{this.state.inputs.gender.error}</div>

				<label htmlFor="birthdate">Birthdate</label>
				<input type="text" placeholder="month/day/year" value={this.state.inputs.birthdate.value} name="birthdate" onChange={this.onChangeHandler.bind(this)} autoComplete='off' />
				<div>{this.state.inputs.birthdate.error}</div>

				<input type="submit" value="Submit" />
			</form>
		);
	}
}
// RegisterForm.contextTypes = {
// 	router: React.PropTypes.object.isRequired,
// }
