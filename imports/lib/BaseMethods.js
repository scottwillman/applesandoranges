import { Meteor } from 'meteor/meteor';
import { validate, sanitize } from '/imports/lib/validate.js';
// import { UserActivityLogMethods } from '/imports/methods/userActivity.js';


export class BaseMethods {

	// constructor() {
	// 	this.__userActivityLogMethods = new UserActivityLogMethods();
	// }

	__direct(data, subSchema) {

		if (Array.isArray(data)) {
			let result = [];
			for (var s in data) {

				if (Array.isArray(data[s])) {
					result.push(this.__direct(data[s], subSchema));

				} else if (typeof(data[s]) === "object") {
					return this._sanitize(data[s], subSchema[s]);

				} else {
					// console.log("array: "+data[s]);
					result.push(sanitize(data[s], subSchema));
				}
			}
			return result;
		} else if (typeof(data) === "object") {
			return this._sanitize(data, subSchema);

		} else {
			// console.log("string: "+data);
			return sanitize(data, subSchema);
		}
	}

	_sanitize(data, subSchema=null) {
		let schema = subSchema || this.schema;

		let cleanData = {};
		for (var d in data) {
			if (!schema.hasOwnProperty(d)) {
				throw new Meteor.Error("schemaError", 'Key: "'+d+'" does not exist in schema');
			}
			cleanData[d] = this.__direct(data[d], schema[d]);
		}
		return cleanData;
	}


	__checkArrayForNestedObjects(dataArray) {
		for (let d in dataArray) {
			if (Array.isArray(dataArray[d])) {
				this.__checkArrayForNestedObjects(dataArray[d]);
			} else if (typeof(dataArray[d]) === 'object') {
				throw new Meteor.Error("nestedObjectError", "Object contained in array. Will not overwrite");
			}
		}
	}

	_flattenObject(data) {
		// Flattens objects into a 2D 'dot' notated object userful for mongo updates
		let flatData = {};

		for (let d in data) {

			if (Array.isArray(data[d])) {
				// Cannot flatten an array of objects because it would overwrite existing array
				// elements in the DB. Handle 'pushing' onto array in a seperate function.
				this.__checkArrayForNestedObjects(data[d]);

				flatData[d] = data[d];

			} else if (typeof(data[d]) === 'object') {
				const flatObject = this._flattenObject(data[d]);
				for (let s in flatObject) {
					flatData[d+"."+s] = flatObject[s];
				}

			} else {
				flatData[d] = data[d];
			}
		}
		return flatData;
	}

	__logUserActivity(data) {

		const rawData = {
			'sender': data.sender || Meteor.userId() || null,
			'receiver': {
				'collection': this._collection._name,
				'id': data.id,
			},
			'action': data.action,
			'timestamp': new Date(),
		};

		try {
			UserActivityLog.insert(rawData);
		} catch(err) {
			throw new MeteorError("userActivityLogError", "Unable to insert log data.")
		}

	}
}
