import validator from 'validator';
import { Meteor } from 'meteor/meteor';



const messageTable = {
	'email':'This is not a valid email address',
	'required':'This is a required field',
	'maxChars128':'Text exceeds 128 character maximum',
	'commaSeparatedList':'Please use a comma',
}


const InputValidators = {

	email: function(value) {
		return validator.isEmail(value) ? "" : messageTable['email'];
	},
	required: function(value) {
		return validator.isNull(value) ? messageTable['required'] : "";
	},
	maxChars128: function(value) {
		return validator.isLength(value, {max:128}) ? "" : messageTable['maxChars128'];
	},
	commaSeparatedList: function(value) {
		return (value.indexOf(',') > -1) ? "":messageTable['commaSeparatedList'];
	},

}

export function validate(value, validationRules) {
	let error = "";

	for (var i=0; i < validationRules.length; i++) {
		const rule = validationRules[i];
		const error = InputValidators[rule](value);

		if (error !== "") return error; // return here to stop processing future rules
	}
	return error;
}
