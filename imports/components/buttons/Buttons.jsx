import React from 'react';
import FontAwesome from 'react-fontawesome';

import './buttons.scss';



/**

*/
export const Icon = (props) => {
	return(
		<FontAwesome
			name={props.name}
			style={props.color ? { color: props.color } : null}
		/>
	);
}


/**
@size: named size sm, md, lg
@isSubmit: boolean
@onClickHandler: function
@color: any valid css color identifier. For ex. rgb(0,0,0), #999999, red, etc.
*/
export const Button = (props) => {

	const btnClassName = "btn-"+props.size;

	return(
		<button type={props.isSubmit ? "submit" : "button"} className={btnClassName} onClick={props.onClickHandler}>
			<span>{props.children}</span>
		</button>
	);
}


export const ButtonGroup = (props) => {
	return(
		<div className="btn-group">
			{props.children.map((child, n) => {
				return child;
			})}
		</div>
	);
}

/**
@size: named size sm, md, lg
@isSubmit: boolean
@onClickHandler: function
@iconName: named Font Awesome icon
@color: any valid css color identifier. For ex. rgb(0,0,0), #999999, red, etc.
*/
// export const IconButton = (props) => {
//
// 	const btnClassName = "btn-"+props.size;
//
// 	return(
// 		<button type={props.isSubmit ? "submit" : "button"} className={btnClassName} onClick={props.onClickHandler}>
// 			<FontAwesome
// 				name={props.iconName}
// 				style={{ color: props.color }}
// 			/>
// 		</button>
// 	);
// }
