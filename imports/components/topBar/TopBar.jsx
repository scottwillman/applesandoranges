import React from 'react';
import ReactDOM from 'react-dom';
// import { Meteor } from 'meteor/meteor';
// import { Roles } from 'meteor/alanning:roles';
import { IndexLink, Link } from 'react-router';

import './TopBar.scss';


export class TopBar extends React.Component {

	isLoggedIn() {
		return this.props.currentUser ? true:false;
	}

	doLogout(e) {
		e.preventDefault();
		this.props.doLogout();
	}

	showUserDropdown(e) {
		e.preventDefault();
		const el = ReactDOM.findDOMNode(this.refs.userDropdown);
		el.style.display = 'inline-block';
	}

	showUserMenu() {
		return (
			<div className="dropdown">
				<a href="" onClick={this.showUserDropdown.bind(this)} className="dropdownLink">{this.props.currentUser.profile.name}</a>
				<div style={{'display':'none'}} ref="userDropdown" className="dropdownContent">
					<ul>
						{this.props.menuOptions.map((option) => {
							return <li>{option}</li>
						})}

						<li><a href="" onClick={this.doLogout.bind(this)}>logout</a></li>
					</ul>
				</div>

			</div>
		);
	}

	render() {

		return(
			<div className="cmptTopBar">
				<div className="cmptTopBarCenter">
					<IndexLink to="/"><img src={this.props.logoImagePath} /></IndexLink>
				</div>

				<div className="cmptTopBarLeft"></div>

				<div className="cmptTopBarRight">
					{ this.isLoggedIn() ? this.showUserMenu() : <Link to="/login">Login</Link> }
				</div>
			</div>
		)
	}
}
