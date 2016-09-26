import React from 'react';

import { validate } from '../FormValidators.js';


export class AutoSuggestInput extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			'value': this.props.inputProps.value,
			'extra': '',
			'error': '',
			'suggestions': [],
			'showSuggestions': false,
		}

		this.isRequired = (this.props.inputProps.validationRules.indexOf('required') > -1) ? true:false;
		this.bound_hideSuggestions = this._hideSuggestions.bind(this); // Necessary to have pre-bound so you can remove the same instance later
	}

	_showSuggestions(value) {
		const escapedValue = value.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
		if (escapedValue === '') return [];
		const regex = new RegExp(escapedValue, 'i');
		const suggestions = this.props.inputProps.inputData.filter(data => regex.test(data.name));

		if (suggestions) {
			this.setState({'suggestions':suggestions, 'showSuggestions':true});
			window.addEventListener('click', this.bound_hideSuggestions);
		}
		return suggestions;
	}

	_hideSuggestions() {
		this.setState({'suggestions': [], 'showSuggestions':false});
		window.removeEventListener('click', this.bound_hideSuggestions);
	}

	processInput(value, extra="") {
		// console.log(value);
		const error = validate(value, this.props.inputProps.validationRules);

		this.setState({'value':value, 'extra':extra, 'error':error}, () => {
			this.props.handleInputChange({
				'name':this.props.inputProps.name,
				'value':extra ? [value, extra] : [value],
				'isValid': (!this.state.error) ? true:false
			});
		});
	}

	handleOnChange(e) {
		e.preventDefault();
		this.processInput(e.target.value);
		const suggestions = this._showSuggestions(e.target.value);
	}

	handleSuggestionClick(e) {
		e.preventDefault();
		e.stopPropagation();

		const value = e.target.getAttribute('data-name');
		const extra = e.target.getAttribute('data-extra');

		this.processInput(value, extra);
		this._hideSuggestions();
	}

	handleKeyPress(e) {

		if (e.keyCode === 38) { // Up arrow (Not Implemented)
			e.preventDefault();
			// console.log('up arrow');

		} else if (e.keyCode === 40) { // Down arrow (Not Implemented)
			e.preventDefault();
			// console.log('down arrow');

		} else if (e.keyCode === 13) { // Enter keyCode (Not Implemented)
			e.preventDefault();
			// console.log('enter');

		} else if (e.keyCode === 27) { // Esc key
			e.preventDefault();
			this._hideSuggestions();
		}

	}

	shouldShowList() {
		return this.state.suggestions.length > 0;
	}

	render() {
		return(
			<fieldset>
				<label htmlFor={this.props.inputProps.name}>
					{this.props.inputProps.label} {(this.isRequired ? "*" : '' )}
				</label>
				<div className="errorField" style={{'display': this.state.error ? 'block':'none'}}>
					{this.state.error}
				</div>
				<input
					type="text"
					autoComplete="off"
					name={this.props.inputProps.name}
					placeholder={this.props.inputProps.placeholder}
					value={this.state.value}
					ref={this.props.inputProps.name}
					maxLength="128"
					onChange={this.handleOnChange.bind(this)}
					onKeyDown={this.handleKeyPress.bind(this)}
				/>
				<div className="cmptAutoSuggestInput_container">
					<ul className="cmptAutoSuggestInput_list" style={{'display': this.state.showSuggestions ? 'block' : 'none'}}>
						{this.state.suggestions.map((entry, n) => {
							return(
								<li
									className="cmptAutoSuggestInput_listItem"
									key={n}
									onClick={this.handleSuggestionClick.bind(this)}
									data-name={entry.name}
									data-extra={entry.extra}
								>
									<div className="cmptAutoSuggestInput_listItemName">{entry.name}</div>
									<div className="cmptAutoSuggestInput_listItemExtra">{entry.extra}</div>
								</li>
							);
						})}
					</ul>
				</div>
			</fieldset>
		);
	}
}
