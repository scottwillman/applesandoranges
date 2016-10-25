import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link } from 'react-router';

import { createContainer } from 'meteor/react-meteor-data';
// import { EditableDataRow } from './containers/EditableDataRow.jsx';

import { FamilyFormRows, AdultFormRow, ChildFormRow } from './containers/adultFormRow.jsx';

import './RosterLayout.scss';


export class RosterLayout extends React.Component {


	render() {

		return (
			<div id="rosterLayout">
				{this.props.roster_loading ?
					<span>loading...</span> :
					<div>
						<div className="listHeaderBar clear-fix">
							<div className="float-left">{this.props.families.length} family in the class</div>
							<div className="float-right">
								{this.props.isRoomParent ?
									<button className="btn-small" onClick=""><span>Add Family</span></button> : null
								}
							</div>
						</div>
						<ul className="rosterList">
							{this.props.families.map((family, k) => {
								return(
									<li key={k}>
										<FamilyFormRows family={family} />
									</li>
								);
							})}
						</ul>
					</div>
				}
			</div>
		);
	}
}

export default RosterLayoutContainer = createContainer((props) => {
	// Do all your reactive data access in this method.
	// Note that this subscription will get cleaned up when your component is unmounted

	let classroom_loading = Meteor.subscribe("classroom.full.byId", props.classroom_id);
	let roster_loading  = Meteor.subscribe("childrenParents.fullProfile.byClassroomId", props.classroom_id);

	function groupFamilies() {
		let families = [];
		let children = Children.find({}).fetch();
		// Conditions not addressed:
		// 1. multiple children per family
		// 2. a child that shares one parent but not another in a multi-child family (ex. same mother, different fathers)
		for (let i in children) {
			let family = {
				'children': [ children[i], ],
				'adults': Meteor.users.find({'profile.children.child': children[i]._id}).fetch(),
			}
			families.push(family);
		}
		return families;
	}

	function isRoomParent() {
		const classroom = Classrooms.findOne(props.classroom_id);
		return (classroom.roomParents.indexOf(Meteor.userId()) > -1) ? true : false;
	}

	return {
		classroom_loading: !classroom_loading.ready(),
		classroom: Classrooms.findOne(props.classroom_id),

		roster_loading: !roster_loading.ready(),
		families: groupFamilies(),

		isRoomParent: !classroom_loading.ready() ? false : isRoomParent(),
	};
}, RosterLayout);
