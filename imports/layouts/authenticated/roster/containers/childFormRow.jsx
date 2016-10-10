import React from 'react';
import FontAwesome from 'react-fontawesome';

// import { BaseForm } from '/imports/lib/BaseForm.jsx';
import { TextInput } from '/imports/components/formElements/TextInput.jsx';

import '/imports/stylesheets/base-styles.scss';


export class ChildFormRow extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			'isEditing': false,
		}
	}

	makeEditable(e) {
		e.preventDefault();
		this.setState({'isEditing': true});
	}
	makeStatic(e) {
		e.preventDefault();
		this.setState({'isEditing': false});
	}

	onSubmitHandler(e) {
		e.preventDefault();

		const allRefs = [];
		for (let r in this.refs) {
			if (this.refs[r].hasChanged()) {
				allRefs.push({
					'name': r,
					'value': this.refs[r].getValue(),
				});
			}
		}
		console.log(allRefs);
	}

	render() {
		return(
			<form className="rosterFormRow" onSubmit={this.onSubmitHandler.bind(this)}>
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
					<li>
						<TextInput
							ref="name"
							name="name"
							value={this.props.child.name}
							validations={['required']}
						/>
					</li>
				</ul>
			</form>
		);
	}
}
