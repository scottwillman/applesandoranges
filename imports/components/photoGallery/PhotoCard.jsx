import React from 'react';


export class PhotoCard extends React.Component {

	getFilename(filepath) {
		var base = new String(filepath).substring(filepath.lastIndexOf('/') + 1);
		if(base.lastIndexOf(".") != -1)
			base = base.substring(0, base.lastIndexOf("."));
		return base;
	}

	render() {

		return (
			<div className="cmptGalleryCard">
				<div className="cmptGalleryCardImage">
					<img className="float-center" src={this.props.thumb} onClick={this.props.clickHandler.bind(this)} />
				</div>
				<div className="cmptGalleryCardName">{this.getFilename(this.props.thumb)}</div>
				{/*<div className="cmptGalleryCardExtra">{this.props.product.price}</div>*/}
			</div>
		);
	}
}
// ProductCard.propTypes = {
// 	imagePath: React.PropTypes.string.isRequired,
// 	imageHeight: React.PropTypes.number.isRequired
// }
