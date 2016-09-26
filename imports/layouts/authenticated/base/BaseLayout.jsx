import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link } from 'react-router';
import { NavLink } from '/imports/components/navLink/NavLink.jsx';
import { createContainer } from 'meteor/react-meteor-data';

import './BaseLayout.scss';

// import { LoginForm } from './containers/loginForm.jsx';


class BaseLayout extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			isAuthenticated: (Meteor.userId() !== null) ? true : false,
		}
	}

	componentWillMount() {
		if (!this.state.isAuthenticated) {
			this.context.router.push('/login');
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (!this.state.isAuthenticated) {
			this.context.router.push('/login');
		}
	}

	toggleUserMenu() {
		this.refs.userMenu.style.display = (this.refs.userMenu.style.display === 'block') ? 'none' : 'block';
	}
	logout(e) {
		e.preventDefault();
		Meteor.logout();
		this.context.router.push('/login');
	}

	render() {
		// console.log(this.props.classroomHandle);
		return(
			<div id="base">
				<div id="headerContainer">
					<div id="top-bar" className="clear-fix">
						<div className="float-left" id="logo"></div>
						<div className="float-right" id="user-menu">
							{this.props.currentUser ?
								<div onClick={this.toggleUserMenu.bind(this)}>
									<span>{Meteor.user().emails[0].address}</span>
									<div className="arrow-down"></div>
								</div> :
								<span></span>
							}
							<div id="user-menu-content" ref="userMenu">
								<ul>
									<li><Link to='/choose'>Change Classroom</Link></li>
									<li><a onClick={this.logout.bind(this)}>Sign Out</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div id="navContainer">
					<div className="classroomHeader">
						{this.props.classroom_loading ?
							<h3>loading...</h3> :
							<h2>{this.props.classroom.name}</h2>
						}
					</div>
					<div className="classroomNavigation">
						{this.props.classroom_loading ?
							<h3>loading...</h3> :
							<ul>
								<NavLink to={`/classroom/${this.props.classroom_id}/roster`}>Class Roster</NavLink>
								<NavLink to={`/classroom/${this.props.classroom._id}/schedule`}>Schedule</NavLink>
								<NavLink to={`/classroom/${this.props.classroom._id}/photos`}>Photo Galleries</NavLink>
							</ul>
						}
					</div>
				</div>
				<div id="bodyContainer">
					{React.Children.map(this.props.children, (child) => {
						return React.cloneElement(child, {
							classroom_id: this.props.classroom_id
						});
					})}
				</div>
				<div id="footer">
					<ul>
						<li><a href="mailto:scottwillman@gmail.com">Made by Us</a></li>
					</ul>
				</div>
			</div>
		)
	}
}
BaseLayout.contextTypes = {
	router: React.PropTypes.object.isRequired,
}


export default BaseLayoutContainer = createContainer((params) => {
	// Do all your reactive data access in this method.
	// Note that this subscription will get cleaned up when your component is unmounted
	// var handle = Meteor.subscribe("todoList", this.props.id);

	// var handle = Meteor.subscribe("user.classrooms");
	let classroom_loading = Meteor.subscribe("classroom.base.byId", params.params.classroomId);

	return {
		currentUser: Meteor.user(),
		classroom_id: params.params.classroomId,
		classroom_loading: !classroom_loading.ready(),
		classroom: Classrooms.findOne({}), // Doesn't support selecting a secondary classroom YET
	};
}, BaseLayout);
