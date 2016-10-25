import React from 'react';
import FontAwesome from 'react-fontawesome';

import { Icon, Button, ButtonGroup } from '/imports/components/buttons/Buttons.jsx';
import { validate } from '/imports/lib/validate.js';

import { logData } from '/imports/lib/logging.js';

import { TextInput } from '/imports/components/formElements/TextInput.jsx';

import '/imports/stylesheets/base-styles.scss';


/**
This is a base class intended to be inherited and extended. It implements
some basic form processing methods useful to most web forms.
REQUIREMENTS FOR EXTENDING THIS CLASS:
1. this.state.errors = {'inputNameA': '', 'inputNameB': ''}
2. Form inputs need a 'ref' that matches the input name in this.state.errors.
3. Form input components need a hasValueChanged() method.
4. Form input components need a getValue() method.
5. this.validations = {'inputNameA': ['required','email'], 'inputNameB':['required']}
*/
class BaseForm extends React.Component {

	/**
	Convenience method to set the error state of a single input.
	*/
	updateErrorState(name, error) {
		const errors = this.state.errors;
		errors[name] = error;
		this.setState({'errors': errors});
	}

	/**
	Convenience method to reset all errors to none. Usefull to be called
	upon canceling a form before submit.
	*/
	resetAllErrors() {
		const errors = this.state.errors;
		for (let e in errors) {
			errors[e] = '';
		}

		this.setState({
			'errors': errors,
		});
	}

	/**
	This is passed to the input to be called when
	the input is ready for validation. Validations are
	defined in the constructor as this.validations.
	*/
	validationCallback(name, value) {
		const error = validate(value, this.validations[name]);

		// Update error state
		this.updateErrorState(name, error);

		return error;
	}

	/**
	This loops through all of the inputs listed in this.refs. It then calls hasValueChanged()
	and getValue() on each input. If any inputs generate an error during validation it returns
	false.
	REQUIRES: A list of validations for each input, usually placed in the constructor of the
	implementing form component. Like so:
		this.validations = {
			'name':  ['required'],
			'email': ['required', 'email'],
		};
	*/
	gatherAndValidateData() {
		const results = {};

		// Iterate through all child input components and check/get their values
		for (let r in this.refs) {
			if (this.refs[r].hasValueChanged()) {
				let value = this.refs[r].getValue();

				let error = validate(value, this.validations[r]);
				this.updateErrorState(r, error);
				if (error) return false; // Do not submit
				results[r] = value;
			}
		}
		return results;
	}
}


/**
This class extends BaseFormRow and adds methods to toggle between
the editable form element and static text.
NOTE: these methods only manage a state variable called 'isEditing'.
Actual elements need to be implemented by the form view that renders the form.
NOTE: Since the 'isEditing' state variable is not set in this class (to avoid
complication with constructor/state/inheritance), you need to initiate the 'isEditing'
variable in the constructor of the rendering form component.
*/
class SwitchableStaticForm extends BaseForm {

	/**
	Sets the 'isEditing' state variable to 'true'.
	*/
	makeEditable(e) {
		e.preventDefault();
		this.setState({'isEditing': true});
	}

	/**
	Sets the 'isEditing' state variable to 'false'. Would likely
	be called during a handleCancel type function or upon success of
	a db submit.
	*/
	makeStatic(e) {
		e.preventDefault();
		this.setState({'isEditing': false,});
	}
}




export class AdultFormRow extends SwitchableStaticForm {

	constructor(props) {
		super(props);

		this.state = {
			'isEditing': false,
			'errors': {
				'name':'',
				'email':'',
			}
		};

		this.validations = {
			'name':  ['required'],
			'email': ['required', 'email'],
			'phone': [''],
		};
	}


	onSubmitHandler(e) {
		e.preventDefault();

		// Iterate through all child input components and check/get their values
		const validatedData = this.gatherAndValidateData();
		if (!validatedData) return; // DO NOT SUBMIT

		const data = {
			'_id': this.props.adult._id,
			'data': validatedData,
		};

		// logData('Form data', data);

		Meteor.call('user.update', data, (err, result) => {
			if (err) {
				console.log(err.error);
			} else {
				console.log(result);
				this.setState({'isEditing':false});
			}
		});
	}

	render() {
		return(
			<form className="rosterFormRow">
				<ul>
					<li>
						{!this.state.isEditing ?
							<Button size="small" onClickHandler={this.makeEditable.bind(this)}>
								<Icon name="pencil" />
							</Button> :
							<ButtonGroup>
								<Button size="small" onClickHandler={this.makeStatic.bind(this)}>
									<Icon name="times" color='rgb(255,0,0)' />
								</Button>
								<Button size="small" onClickHandler={this.onSubmitHandler.bind(this)} isSubmit="true">
									<Icon name="check" color='rgb(0,255,0)' />
								</Button>
							</ButtonGroup>
						}
					</li>
					<li>
						{this.state.isEditing ?
							<TextInput
								ref="name"
								name="name"
								value={this.props.adult.profile.name}
								validationCallback={this.validationCallback.bind(this)}
								errorMessage={this.state.errors.name}
							/>:
							<div>{this.props.adult.profile.name}</div>
						}

					</li>
					<li>
						{this.state.isEditing ?
							<TextInput
								ref="email"
								name="email"
								value={this.props.adult.emails[0].address}
								validationCallback={this.validationCallback.bind(this)}
								errorMessage={this.state.errors.email}
							/>:
							<div>{this.props.adult.emails[0].address}</div>
						}
					</li>
					<li>
						{this.state.isEditing ?
							<TextInput
								ref="phone"
								name="phone"
								value={this.props.adult.phone}
								validationCallback={this.validationCallback.bind(this)}
								errorMessage={this.state.errors.phone}
							/>:
							<div>{this.props.adult.phone}</div>
						}
					</li>
				</ul>
			</form>
		);
	}
}

export class ChildFormRow extends SwitchableStaticForm {

	constructor(props) {
		super(props);

		this.state = {
			'isEditing': false,
			'errors': {
				'name':'',
			}
		};

		this.validations = {
			'name':  ['required'],
		};
	}


	onSubmitHandler(e) {
		e.preventDefault();

		// Iterate through all child input components and check/get their values
		const validatedData = this.gatherAndValidateData();
		if (!validatedData) return; // DO NOT SUBMIT

		const data = {
			'_id': this.props.child._id,
			'data': validatedData,
		};

		logData('Form data', data);

		Meteor.call('child.update', data, (err, result) => {
			if (err) {
				console.log(err.error);
			} else {
				console.log(result);
				this.setState({'isEditing':false});
			}
		});
	}

	render() {
		return(
			<form className="rosterFormRow">
				<ul>
					<li>
						{!this.state.isEditing ?
							<Button size="small" onClickHandler={this.makeEditable.bind(this)}>
								<Icon name="pencil" />
							</Button> :
							<ButtonGroup>
								<Button size="small" onClickHandler={this.makeStatic.bind(this)}>
									<Icon name="times" color='rgb(255,0,0)' />
								</Button>
								<Button size="small" onClickHandler={this.onSubmitHandler.bind(this)} isSubmit="true">
									<Icon name="check" color='rgb(0,255,0)' />
								</Button>
							</ButtonGroup>
						}
					</li>
					<li>
						{this.state.isEditing ?
							<TextInput
								ref="name"
								name="name"
								value={this.props.child.name}
								validationCallback={this.validationCallback.bind(this)}
								errorMessage={this.state.errors.name}
							/>:
							<div>{this.props.child.name}</div>
						}

					</li>
				</ul>
			</form>
		);
	}
}


export class FamilyFormRows extends React.Component {
// 	constructor() {
//
// 	}

	render() {
		return(
			<div className="family">
				<div className="children">
					{this.props.family.children.map((child, c) => {
						return <ChildFormRow key={c} child={child} />
					})}
				</div>
				<div className="childrenForm" ref="childrenForm"></div>
				<div className="adults">
					{this.props.family.adults.map((adult, a) => {
						return <AdultFormRow key={a} adult={adult} />
					})}
				</div>
				<div className="adultsForm" ref="adultsForm"></div>
				{this.props.isRoomParent ?
					<div><a href="">Add Child</a> <a href="">Add Adult</a></div> : null
				}
			</div>
		);
	}
}
