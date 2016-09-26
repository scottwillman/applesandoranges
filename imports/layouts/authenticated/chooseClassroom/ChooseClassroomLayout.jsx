import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import './ChooseClassroomLayout.scss';

// import { PasscodeForm } from './containers/PasscodeForm.jsx';
// import { ChooseClassroomForm } from './containers/ChooseClassroomForm.jsx';

class ChooseClassroomLayout extends React.Component {

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

	goToClassroom(classroomId) {
		this.context.router.push('/classroom/'+classroomId);
	}

	getChild(childId) {
		return Children.findOne(childId);
	}
	getClassroom(classroomId) {
		return Classrooms.findOne(classroomId);
	}

	render() {
		return(
			<div id="chooseClassroom-layout">
				<div className="header">
					<img src="/images/aao_logo_orange.png" />
					<h3>Choose Classroom</h3>
				</div>
				<div className="classrooms-list">
					{this.props.classrooms_loading && this.props.children_loading ?
						<div>loading...</div> :
						<ul className="classroomChoiceList">
							{this.props.currentUser.profile.children.map((c, k) => {
								return(
									<li key={k} onClick={() => this.goToClassroom(c.classroom)}>
										<div className="title">{this.getChild(c.child).name}</div>
										<div className="sub-text">{this.getClassroom(c.classroom).name}</div>
									</li>
								);
							})}
						</ul>
					}
				</div>
			</div>
		);
	};
}
ChooseClassroomLayout.contextTypes = {
	router: React.PropTypes.object.isRequired,
}


export default ChooseClassroomLayoutContainer = createContainer(() => {
	// Do all your reactive data access in this method.
	// Note that this subscription will get cleaned up when your component is unmounted

	let classrooms_loading = Meteor.subscribe("classrooms.full.byUserId", Meteor.userId());
	let children_loading = Meteor.subscribe("children.full.byParent", Meteor.userId());


	return {
		currentUser: Meteor.user(),
		classrooms_loading: !classrooms_loading.ready(),
		classrooms: Classrooms.find({}).fetch(),
		children_loading: !children_loading.ready(),
		children: Children.find({}).fetch(),
	};
}, ChooseClassroomLayout);
