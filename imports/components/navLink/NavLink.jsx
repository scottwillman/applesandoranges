import React from 'react'
import { Link } from 'react-router'


export class NavLink extends React.Component {
	render() {
		let isActive = this.context.router.isActive(this.props.to, true),
			className = isActive ? "active" : "";

		return (
			<li className={className}>
				<Link {...this.props} />
			</li>
		)
	}
}
NavLink.contextTypes = {
	router: React.PropTypes.object.isRequired
}
