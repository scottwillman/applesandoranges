import validator from 'validator';
// import { Genders } from '/imports/lib/choices.js';


const messages = {
	'email':'This is not a valid email address',
	'required':'This is a required field',
	'maxChars128':'Text exceeds 128 character maximum',
	'commaSeparatedList':'Separate items with a comma',
	'date':'Not a valid date format',
	'inArray':'Value is not contained in array',
	// 'genderChoice': 'Value is not an allowed gender value',
}


const InputValidators = {

	email: function(value) {
		return validator.isEmail(value) ? "" : messages['email'];
	},
	required: function(value) {
		return validator.isNull(value) ? messages['required'] : "";
	},
	maxChars128: function(value) {
		return validator.isLength(value, {max:128}) ? "" : messages['maxChars128'];
	},
	commaSeparatedList: function(value) {
		return (value.indexOf(',') > -1) ? "" : messages['commaSeparatedList'];
	},
	date: function(value) {
		return validator.isDate(value) ? "" : messages['date'];
	},
	inArray: function(value, arr) {
		return (arr.indexOf(value) > -1) ? messages['inArray'] : "";
	},
	// genderChoice: function(value) {
	// 	return (Genders.indexOf(value) === -1) ? messages['gender'] : "";
	// },
}

const InputSanitizers = {
	trim: function(value) {
		return validator.trim(value);
	},
	email: function(value) {
		return validator.normalizeEmail(value);
	},
	date: function(value) {
		// if this fails it returns 'null'. That's a problem.
		return validator.toDate(value);
	},
}


export function validate(value, validationRules) {
	let error = "";

	for (var i=0; i < validationRules.length; i++) {
		const rule = validationRules[i];
		const error = InputValidators[rule](value);

		// Update this to Throw instead of return (like sanitize)
		if (error !== "") return error; // return here to stop processing future rules
	}
	return error;
}

export function sanitize(value, sanitationRules) {
	for (var i=0; i < sanitationRules.length; i++) {
		const rule = sanitationRules[i];

		try {
			value = InputSanitizers[rule](value);

		} catch(err) {
			throw new Meteor.Error("sanitizeError", 'Data sanitizing failed on value: '+value);
		}
	}
	return value;
}
