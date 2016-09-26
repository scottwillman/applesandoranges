import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { Form } from '/imports/components/forms/Form.jsx';


export class RegisterForm extends React.Component {

	constructor(props) {
		super(props);

		this.state = {'schoolValue': []};
	}

	handleSubmit(values) {
		// console.log(values);

		let cityState = values.cityState.split(',');
		cityState = $.map(cityState, $.trim);
		const [city, state] = cityState;

		const data = {
			'parentName': values.parentName,
			'email': values.email,
			'password': values.password,
			'city': city,
			'state': state,
			'classroomName': values.classroomName,
			'schoolName': values.schoolName,
		}

		Meteor.call('createRoomParent', data,
			(err, res) => {
				if (err) {
					// console.log(err);

					let refName  = null;
					let errorMsg = err.reason;
					switch (err.error) {
						case 'email-exists':
							refName = 'email';
							break;
						case 'classroom-exists':
							refName = 'classroomName';
							break;
					}
					if (refName) {
						this.refs.registerForm.handleServerError(refName, errorMsg);
					}

				} else {
					// Successful redirect
					console.log('success!');
				}
			}
		// 	'name': values.classroomName,
		// 	'school': values.schoolName,
		// 	'teachers': teacherNames
		// }, (err, res) => {

		);
	}

	handleOnChange(formValues) {
		if (this.state.schoolValue !== formValues.schoolName.value) { //this value changed
			const schoolValue = formValues.schoolName.value;
			if (schoolValue.length > 1) {
				const cityState = schoolValue[1];
				this.refs.registerForm.refs.cityState.processInput(cityState);
			}
			this.setState({'schoolValue':schoolValue});
		}
	}

	onSchoolNameChangeHandler(value) {

		function isObjectEmpty(object) {
			for (var key in object) {
				if (object.hasOwnProperty(key)) {
					return false;
				}
			}
			return true;
		}

		const el = document.getElementsByName('cityState')[0];

		if (!isObjectEmpty(value)) {
			this.setState({'cityStateValue': value.extra});

			el.disabled = true;
		} else {
			el.disabled = false;
		}
	}

	render() {

		const schoolData = [
			{
				name: 'Montessori A',
				extra: 'Manhattan Beach, CA',
			},
			{
				name: 'Montessori B',
				extra: 'Santa Monica, CA',
			},
			{
				name: 'Montessori C',
				extra: 'Davenport, IA',
			},
			{
				name: 'Regular School',
				extra: 'Sugarland, TX',
			},
			{
				name: 'Montana Preschool',
				extra: 'Bozeman, MT',
			}
		];

		const formInputs = [

			// {
			// 	'type':'autoSuggestInput',
			// 	'label':'School Name',
			// 	'name':'schoolName',
			// 	'placeholder':'',
			// 	'value':'',
			// 	'validationRules':['required'],
			// 	'inputData':schoolData,
			// }, {
			// 	'type':'textInput',
			// 	'label':'City/State',
			// 	'name':'cityState',
			// 	'placeholder':'ex. Manhattan Beach, CA',
			// 	'value': '',
			// 	'validationRules':['required','commaSeparatedList']
			// }, {
			// 	'type':'textInput',
			// 	'label':'Name of Your Classroom',
			// 	'name':'classroomName',
			// 	'placeholder':'',
			// 	'value':'',
			// 	'validationRules':['required']
			// }, {
			// 	'type':'gap'
			// }, {
			// 	'type':'textInput',
			// 	'label':'Name of Your Child',
			// 	'name':'childName',
			// 	'placeholder':'',
			// 	'value':'',
			// 	'validationRules':['required'],
			// }, {
			// 	'type':'textInput',
			// 	'label':"Child's Birthdate",
			// 	'name':'childBirthdate',
			// 	'placeholder':'',
			// 	'value':'',
			// 	'validationRules':['required']
			// }, {
			// 	'type':'selectInput',
			// 	'label':"Relationship",
			// 	'name':'childRelationship',
			// 	'placeholder':'',
			// 	'value':'',
			// 	'validationRules':['required']
			// }, {
			// 	'type':'gap'
			// },
			{
				'type':'textInput',
				'label':'',
				'name':'parentName',
				'placeholder':'Your Name',
				'value':'',
				'validationRules':['required'],
			},
			{
				'type':'textInput',
				'label':'',
				'name':'email',
				'placeholder':'E-Mail Address',
				'value':'',
				'validationRules':['required','email']
			}, {
				'type':'createPasswordInput',
				'label':'',
				'name':'password',
				'placeholder':'Create a Password',
				'value':'',
				'validationRules':['required']
			},
		]

		return (
			<Form
				ref="registerForm"
				formInputs={formInputs}
				buttonText="Let's go!"
				handleSubmit={this.handleSubmit.bind(this)}
				handleOnChange={this.handleOnChange.bind(this)}
			/>
		);
	}
}
RegisterForm.contextTypes = {
	router: React.PropTypes.object.isRequired,
}
