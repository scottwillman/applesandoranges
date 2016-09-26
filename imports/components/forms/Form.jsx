import React from 'react';

// import { TextInput } from './elements/TextInput.jsx';
// import { AutoSuggestInput } from './elements/AutoSuggestInput.jsx';
// import { PasswordInput } from './elements/PasswordInput.jsx';
// import { SelectInput } from './elements/SelectInput.jsx';

import './Form.scss';


export class Form extends React.Component {

		// let inputs = [];
		// for (i in props.schema.schema()) {
		// 	let s = props.schema.schema(i);
		// 	let input = {
		// 		'name': i,
		// 		'type': null,
		// 		'optional': false,
		// 		'label': props.schema.label(i),
		// 		'allowedValues': null,
		// 	}
		// 	if (s.hasOwnProperty('optional')) input.optional = true;
		//
		// 	if (s.hasOwnProperty('allowedValues')) {
		// 		input.type = 'Select';
		// 	} else {
		// 		input.type = s.type.name;
		// 	}
		// 	inputs.push(input);
		// }
		// this.state = {'inputs': inputs};


		// validate
		// props.schema.newContext().validateOne({'name':2},'name');

	onSubmitHandler(e) {
		e.preventDefault();
		this.props.onSubmitHandler();
	}

	render() {

		return(
			<form ref="formElement" onSubmit={this.onSubmitHandler.bind(this)} className="cmptFormsForm">
				{this.props.children}
			</form>
		);
	}

}
