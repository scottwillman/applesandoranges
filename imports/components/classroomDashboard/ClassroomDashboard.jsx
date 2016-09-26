import React from 'react';

export default class ClassroomDashboard extends React.Component {

	render() {
		return (
			<ul>
				<li><b>School Name:</b> {this.props.classroom.school}</li>
				<li><b>Classroom Name:</b> {this.props.classroom.name}</li>
				<li><b>Teacher Names:</b> {this.props.classroom.teachers.join(', ')}</li>
				<li><b>Passcode:</b> {this.props.classroom.passcode}</li>
			</ul>
		);
	}
}
