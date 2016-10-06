import React from 'react';
import FontAwesome from 'react-fontawesome';

import { BaseForm } from '/imports/lib/BaseForm.jsx';


import '/imports/stylesheets/base-styles.scss';


export class EditableElementTextInput extends BaseForm {

	constructor(props) {
		super(props);

		this.state = {
			'formMessage': '',
			'originalValue': this.props.value,
			'value': this.props.value,
			'validations': this.props.validations,
			'error': '',
		}
	}

	onChangeHandler(e) {
		e.preventDefault();
		this.setState({'value': e.target.value});
	}

	renderFormElement() {
		return(
			<input
				type="text"
				name={this.props.name}
				value={this.state.value}
				onChange={this.onChangeHandler.bind(this)}
				autoComplete='off'
			/>
		);
	}

	renderData() {
		return(
			<div>{this.state.value}</div>
		);
	}

	render() {
		return(
			<div>
				{this.props.isEditing ?
					this.renderFormElement() :
					this.renderData()
				}
			</div>
		);
	}
}



// export class EditableDataRow extends BaseForm {
//
// 	constructor(props) {
// 		super(props);
//
// 		this.state = {
// 			'isEditing': false,
// 			'formMessage':'',
// 			'inputs': {
// 				'name': {
// 					'origValue': this.props.name,
// 					'value': this.props.name,
// 					'validations': ['required'],
// 					'error': '',
// 				},
// 				'email': {
// 					'origValue': this.props.email,
// 					'value': this.props.email,
// 					'validations': ['required','email'],
// 					'error': '',
// 				},
// 			},
// 		}
// 	}
//
// 	onChangeHandler(e) {
// 		e.preventDefault();
//
// 		this._updateInput(e.target.name, e.target.value);
// 	}
//
// 	onSubmitHandler(e) {
// 		e.preventDefault();
// 		// run the method to save it
//
// 		// On Success
// 		const curState = this.state.inputs;
// 		for (let i in curState) {
// 			if (curState[i].value !== curState[i].origValue) {
// 				curState[i].origValue = curState[i].value;
// 			}
// 		}
// 		this.setState({
// 			'inputs': curState,
// 			'isEditing':false,
// 		});
// 	}
//
// 	renderForm() {
// 		return(
// 			<form onSubmit={this.onSubmitHandler.bind(this)}>
// 				<input type="text" name="name" value={this.state.inputs.name.value} onChange={this.onChangeHandler.bind(this)} autoComplete='off'/>
// 				<input type="text" name="email" value={this.state.inputs.email.value} onChange={this.onChangeHandler.bind(this)} autoComplete='off'/>
// 				<button onClick={this.onSubmitHandler.bind(this)} className="btn-small">Save</button>
// 				<button onClick={this.cancelEdit.bind(this)} className="btn-small">Cancel</button>
// 			</form>
// 		);
// 	}
//
// 	renderText() {
// 		return(
// 			<div>
// 				<button className="btn-small" onClick={this.makeEditable.bind(this)}><FontAwesome name='pencil' /></button>
// 				<span>{this.state.inputs.name.origValue}</span>
// 				<span>{this.state.inputs.email.origValue}</span>
// 			</div>
// 		);
// 	}
//
// 	makeEditable(e) {
// 		e.preventDefault();
// 		this.setState({'isEditing':true});
// 	}
// 	cancelEdit(e) {
// 		e.preventDefault();
// 		this.setState({'isEditing':false});
// 		const curState = this.state.inputs;
// 		for (let i in curState) {
// 			if (curState[i].value !== curState[i].origValue) {
// 				curState[i].value = curState[i].origValue;
// 			}
// 		}
// 		this.setState({'inputs': curState});
// 	}
//
// 	render() {
// 		return(
// 			<div>
// 				{this.state.isEditing ?
// 					this.renderForm() :
// 					this.renderText()
// 				}
// 			</div>
// 		);
// 	}
// }
