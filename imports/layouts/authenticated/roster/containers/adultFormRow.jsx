import React from 'react';
import FontAwesome from 'react-fontawesome';

import { validate } from '/imports/lib/validate.js';

// import { BaseForm } from '/imports/lib/BaseForm.jsx';
import { TextInput } from '/imports/components/formElements/TextInput.jsx';

import '/imports/stylesheets/base-styles.scss';


export class AdultFormRow extends React.Component {

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
		};
	}

	makeEditable(e) {
		e.preventDefault();
		this.setState({'isEditing': true});
	}
	makeStatic(e) {
		e.preventDefault();

		// Reset errors upon cancel.
		const errors = this.state.errors;
		for (let e in errors) {
			errors[e] = '';
		}
		this.setState({
			'isEditing': false,
			'errors': errors,
		});
	}

	validationCallback(name, value) {
		const error = validate(value, this.validations[name]);
		const errors = this.state.errors;
		errors[name] = error;
		this.setState({'errors': errors});
		return error;
	}

	onSubmitHandler(e) {
		e.preventDefault();

		// Most user data is stored in the profile, except for the following:
		const nonProfileKeys = ['username','email'];

		const results = {};
		for (let r in this.refs) {
			if (this.refs[r].hasValueChanged()) {
				const value = this.refs[r].getValue();

				let error = this.validationCallback(r, value);
				if (error) return; // Do not submit

				if (nonProfileKeys.indexOf(r) > -1) {
					results[r] = value;
				} else {
					if (!results.hasOwnProperty('profile')) { results['profile'] = {}; }
					results['profile'][r] = value;
				}
			}
		}

		const data = {
			'_id': this.props.adult._id,
			'data': results,
		};
		// console.log(JSON.stringify(data, null, 4));
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
							<button type="button" className="btn-small" onClick={this.makeEditable.bind(this)}>
								<FontAwesome name='pencil' />
							</button> :
							<span>
								<button type="button" className="btn-small" onClick={this.makeStatic.bind(this)}>
									<FontAwesome
										name='times'
										style={{ color: 'rgb(255,0,0)' }}
									/>
								</button>
								<button type="submit" className="btn-small" onClick={this.onSubmitHandler.bind(this)}>
									<FontAwesome
										name='check'
										style={{ color: 'rgb(0,255,0)' }}
									/>
								</button>
							</span>
						}
					</li>
					<li>{
							this.state.isEditing ?
							<TextInput
								ref="name"
								name="name"
								value={this.props.adult.profile.name}
								validationCallback={this.validationCallback.bind(this)}
								errorMessage={this.state.errors.name}
							/> :
							<div>{this.props.adult.profile.name}</div>
						}
					</li>
					<li>{
							this.state.isEditing ?
							<TextInput
								ref="email"
								name="email"
								value={this.props.adult.emails[0].address}
								validationCallback={this.validationCallback.bind(this)}
								errorMessage={this.state.errors.email}
							/> :
							<div>{this.props.adult.emails[0].address}</div>
						}
					</li>
				</ul>
			</form>
		);
	}
}
