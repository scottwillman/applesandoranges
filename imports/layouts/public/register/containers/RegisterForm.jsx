import React from 'react';
import { Meteor } from 'meteor/meteor';

import { BaseForm } from '/imports/lib/BaseForm.jsx';

import { validate } from '/imports/lib/validate.js';
import { Genders, Relationships } from '/imports/lib/choices.js';


export class RegisterForm extends BaseForm {

	constructor(props) {
		super(props);

		this.state = {
			'formMessage':'',
			'inputs': {
				'parentName': {
					'value': '',
					'validations': ['required'],
					'error': '',
				},
				'parentEmail': {
					'value': '',
					'validations': ['required', 'email'],
					'error': '',
				},
				'parentPassword': {
					'value': '',
					'validations': ['required'],
					'error': '',
				},
				'childName': {
					'value': '',
					'validations': ['required'],
					'error': '',
				},
				// 'childBirthdate': {
				// 	'value': '',
				// 	'validations': ['required','date'],
				// 	'error': '',
				// },
				// 'childGender': {
				// 	'value': 'female',
				// 	'validations': ['required'],
				// 	'error': '',
				// },
				// 'childRelationship': {
				// 	'value': 'mother',
				// 	'validations': ['required'],
				// 	'error': '',
				// },
				'schoolName': {
					'value': '',
					'validations': ['required'],
					'error': '',
				},
				'schoolCityState': {
					'value': '',
					'validations': ['required','commaSeparatedList'],
					'error': '',
				},
				'classroomName': {
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
		const data    = this._prepareAllDataForSubmit();
		// this._submitForm('children.insert', this.onSuccess);
		if (isValid) {
			Meteor.call('roomparent.register', data, (err, result) => {
				if (err) {
					if (err.error === 'form') {
						// show form error somehow
						this.setState({'formMessage': err.reason});
					} else {
						this._invalidateInput(err.error, err.reason);
					}
				} else {
					this.context.router.push('/login');
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
					<label htmlFor="schoolName">School Name</label>
					<input type="text" value={this.state.inputs.schoolName.value} name="schoolName" onChange={this.onChangeHandler.bind(this)} autoComplete='off' />
					<div className="error-message float-right">{this.state.inputs.schoolName.error}</div>
				</fieldset>
				<fieldset>
					<label htmlFor="schoolCityState">City/State</label>
					<input type="text" value={this.state.inputs.schoolCityState.value} name="schoolCityState" onChange={this.onChangeHandler.bind(this)} autoComplete='off' />
					<div className="error-message float-right">{this.state.inputs.schoolCityState.error}</div>
				</fieldset>

				<br />

				<fieldset>
					<label htmlFor="classroomName">Classroom Name</label>
					<input type="text" value={this.state.inputs.classroomName.value} name="classroomName" onChange={this.onChangeHandler.bind(this)} autoComplete='off' />
					<div className="error-message float-right">{this.state.inputs.classroomName.error}</div>
				</fieldset>

				<br />

				<fieldset>
					<label htmlFor="parentName">Your Name</label>
					<input type="text" value={this.state.inputs.parentName.value} name="parentName" onChange={this.onChangeHandler.bind(this)} autoComplete='off' />
					<div className="error-message float-right">{this.state.inputs.parentName.error}</div>
				</fieldset>
				<fieldset>
					<label htmlFor="childName">Your Child's Name</label>
					<input type="text" value={this.state.inputs.childName.value} name="childName" onChange={this.onChangeHandler.bind(this)} autoComplete='off' />
					<div className="error-message float-right">{this.state.inputs.childName.error}</div>
				</fieldset>

				<br />

				<fieldset>
					<label htmlFor="parentEmail">Your Email</label>
					<input type="text" value={this.state.inputs.parentEmail.value} name="parentEmail" onChange={this.onChangeHandler.bind(this)} autoComplete='off' />
					<div className="error-message float-right">{this.state.inputs.parentEmail.error}</div>
				</fieldset>
				<fieldset>
					<label htmlFor="parentPassword">Choose Password</label>
					<input type="password" value={this.state.inputs.parentPassword.value} name="parentPassword" onChange={this.onChangeHandler.bind(this)} autoComplete='off' />
					<div className="error-message float-right">{this.state.inputs.parentPassword.error}</div>
				</fieldset>

				{/*<fieldset>
					<label htmlFor="childBirthdate">Birthdate</label>
					<input type="text" value={this.state.inputs.childBirthdate.value} name="childBirthdate" onChange={this.onChangeHandler.bind(this)} autoComplete='off' />
					<div className="error-message float-right">{this.state.inputs.childBirthdate.error}</div>
				</fieldset>

				<fieldset>
					<label htmlFor="childGender">Gender</label>
					<select name="childGender" onChange={this.onChangeHandler.bind(this)} autoComplete='off'>
						{Genders.map((gender, n) => {
							return <option value={gender} key={n}>{gender}</option>
						})}
					</select>
					<div className="error-message float-right">{this.state.inputs.childGender.error}</div>
				</fieldset>

				<fieldset>
					<label htmlFor="childRelationship">Relationship</label>
					<select name="childRelationship" onChange={this.onChangeHandler.bind(this)} autoComplete='off'>
						{Relationships.map((relationship, n) => {
							return <option value={relationship} key={n}>{relationship}</option>
						})}
					</select>
					<div className="error-message float-right">{this.state.inputs.childRelationship.error}</div>
				</fieldset>
				*/}
				<button className="btn"><span>Register</span></button>
			</form>
		);
	}
}
RegisterForm.contextTypes = {
	router: React.PropTypes.object.isRequired,
}
