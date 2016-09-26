import { Meteor } from 'meteor/meteor';
import { BaseMethods } from '/imports/lib/BaseMethods.js';


export class ClassroomMethods extends BaseMethods {
	constructor() {
		super();

		this._collection = Classrooms;
		this.schema = {
			'name':     ['trim'],
			'school':   [],
			'teachers': [
				{
					'name':  ['trim'],
					'phone': ['trim'],
					'email': ['email'],
				}
			],
			'children':    [],
			'roomParents': [],
		};
	}

	exists(data) {
		const cleanData = this._sanitize(data);
		return this._collection.find(cleanData, {'limit':1}).count() ? true : false;
	}

	findOneId(data) {
		const cleanData = this._sanitize(data);
		const result = this._collection.find(cleanData, {'limit':1, 'fields':{'_id':1}}).fetch();
		return (result) ? result._id : false;
	}

	create(data) {
		let result = {
			resp: '',
			error: '',
		}

		// Validate And Sanitize
		let cleanData = null;
		try {
			cleanData = this._sanitize(data);
		} catch(err) {
			result.error = err;
			return result;
		}

		// Perform DB actions
		try {
			cleanData.active = {
				'value': true,
				'timestamp': new Date(),
			}
			result.resp = this._collection.insert(cleanData);
			this.__logUserActivity({
				'id': result.resp,
				'action': "Classroom created: "+cleanData.name,
			});
		} catch(err) {
			result.error = err;
			return result;
		}
		return result;
	}
}
