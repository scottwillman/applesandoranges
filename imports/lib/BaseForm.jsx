import React from 'react';

import { validate } from '/imports/lib/validate.js';


export class BaseForm extends React.Component {

	_updateInput(inputName, value) {
		const curState = this.state.inputs;

		curState[inputName].value = value;
		curState[inputName].error = validate(value, curState[inputName].validations);

		this.setState({'inputs': curState});
		this.setState({'formMessage':''});
	}

	_validateAllInputs() {
		let isFormValid = true;
		const curState = this.state.inputs;
		for (var i in curState) {
			curState[i].error = validate(curState[i].value, curState[i].validations);
			if (isFormValid && curState[i].error !== "") isFormValid = false;
		}
		this.setState({'inputs': curState});
		return isFormValid;
	}

	_invalidateInput(inputName, errorMessage) {
		const curState = this.state.inputs;
		curState[inputName].error = errorMessage;
		this.setState({'inputs': curState});
	}

	_prepareAllDataForSubmit() {
		const data = {};
		const curState = this.state.inputs;

		for (var i in curState) { data[i] = curState[i].value; }
		return data;
	}

	_submitForm(methodName, onSuccessCallback) {
		const data = this._prepareAllDataForSubmit();

		Meteor.call(methodName, data, (err, resp) => {
			if (err) {
				console.log(err);
				this.setState({'formMessage': err.reason});
			} else {
				// console.log(resp);
				this.setState({'formMessage': 'Success!'});
				onSuccessCallback();
			}
		});
	}

	onChangeHandler() {}

	onSubmitHandler() {}

	onSuccess() {}

	render() {}
}
