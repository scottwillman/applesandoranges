import React from 'react';


export class TextInput extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			'value': this.props.value,
			'errorMsg': '',
		};

		// this.isRequired = (this.props.inputProps.validationRules.indexOf('required') > -1) ? true:false;
	}

	onChangeHandler(e) {
		e.preventDefault();
		const value = e.target.value;
		this.setState({'value':value}, () => {
			this.props.onChangeHandler(this.props.name, value);
		});
	}

	render() {
		return(
			<input type="text" value={this.state.value} name={this.props.name} onChange={this.onChangeHandler.bind(this)} />
		)
	}

}
