import React from 'react';

import { BaseForm } from '/imports/lib/BaseForm.jsx';

import '/imports/stylesheets/base-styles.scss';

export class EditableDataRow extends BaseForm {

	constructor(props) {
		super(props);

		this.state = {
			'isEditing': false,
			'formMessage':'',
			'inputs': {
				'name': {
					'origValue': '',
					'value': '',
					'validations': ['required'],
					'error': '',
				},
			},
		}
	}

	onChangeHandler(e) {
		e.preventDefault();

		this._updateInput(e.target.name, e.target.value);
	}

	onSubmitHandler(e) {
		e.preventDefault();
		// run the method to save it

		// On Success
		const curState = this.state.inputs;
		for (let i in curState) {
			if (curState[i].value !== curState[i].origValue) {
				curState[i].origValue = curState[i].value;
			}
		}
		this.setState({'inputs': curState});
		this.setState({'isEditing':false});
	}

	renderForm() {
		return(
			<form>
				<label htmlFor="name">Name</label>
				<input type="text" name="name" value={this.state.inputs.name.value} onChange={this.onChangeHandler.bind(this)} autoComplete='off'/>
				<button onClick={this.onSubmitHandler.bind(this)} className="btn-small">Save</button>
				<button onClick={this.cancelEdit.bind(this)} className="btn-small">Cancel</button>
			</form>
		);
	}

	renderText() {
		return(
			<div>
				<button className="btn-small" onClick={this.makeEditable.bind(this)}>Edit</button>
				<span>{this.state.inputs.name.origValue}</span>
			</div>
		);
	}

	makeEditable(e) {
		e.preventDefault();
		this.setState({'isEditing':true});
	}
	cancelEdit(e) {
		e.preventDefault();
		this.setState({'isEditing':false});
		const curState = this.state.inputs;
		for (let i in curState) {
			if (curState[i].value !== curState[i].origValue) {
				curState[i].value = curState[i].origValue;
			}
		}
		this.setState({'inputs': curState});
	}

	render() {
		return(
			<div>
				{this.state.isEditing ?
					this.renderForm() :
					this.renderText()
				}
			</div>
		);
	}
}
