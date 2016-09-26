import React from 'react';
// import ReactDOM from 'react-dom';
// import { Meteor } from 'meteor/meteor';

// import { Form } from '/imports/components/forms/Form.jsx';
import { TextInput } from '/imports/components/forms/inputs/TextInput.jsx';


export class FormHarness extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			'name': '',
			'gender': '',
		};

		this.schema_ctx_children = Children.simpleSchema().namedContext('child');
	}

	onSubmitHandler(e) {
		e.preventDefault();
		console.log(this.state);
	}

	onChangeHandler(e) {
		e.preventDefault();

		this.schema_ctx_children.validateOne({[e.target.name]: e.target.value}, e.target.name);
		this.setState({[e.target.name]: e.target.value});

		console.log(e.target.name+": "+e.target.value+" - is invalid: "+this.schema_ctx_children.keyIsInvalid(e.target.name));
	}

	render() {

		return (
			<form onSubmit={this.onSubmitHandler.bind(this)}>
				<label htmlFor="name">Name</label>
				<input type="text" value={this.state.name} name="name" onChange={this.onChangeHandler.bind(this)} autoComplete='off' />
				<div>{this.schema_ctx_children.keyErrorMessage("name")}</div>

				<label htmlFor="gender">Gender</label>
				<select name="gender" onChange={this.onChangeHandler.bind(this)}>
					{Children.simpleSchema().schema('gender').allowedValues.map((g, n) => {
						return <option key={n} value={g}>{g}</option>;
					})}
				</select>
				<div>{this.schema_ctx_children.keyErrorMessage("gender")}</div>


				<input type="submit" value="Submit" />
			</form>
		);
	}
}
// RegisterForm.contextTypes = {
// 	router: React.PropTypes.object.isRequired,
// }
