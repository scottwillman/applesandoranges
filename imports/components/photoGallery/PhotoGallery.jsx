import React from 'react';
import ReactDOM from 'react-dom';
import Lightbox from 'react-images';

import './PhotoGallery.scss';

import { PhotoCard } from './PhotoCard.jsx';


export default class PhotoGallery extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			lightboxIsOpen: false,
			currentImage: 0,
		};

	}
	componentDidMount() {
		// this.modal = new Foundation.Reveal($(this.refs.modal));

	}
	photoClickHandler(e) {
		e.preventDefault();

		const thumb = $(e.target).attr('src');
		const full  = thumb.replace('thumb','full');
		// console.log(full);
		// this.setState({fullResPhoto:full}, () => {
		// 	ReactDOM.render(<img src={this.state.fullResPhoto} />, ReactDOM.findDOMNode(this.refs.modal));
		// 	// $(this.refs.modal).foundation('open');
		// });
	}
	componentWillUnmount() {
		// $(this.refs.modal).foundation('destroy');
	}

	openLightbox (index, event) {
		event.preventDefault();
		this.setState({
			currentImage: index,
			lightboxIsOpen: true,
		});
	}
	closeLightbox () {
		this.setState({
			currentImage: 0,
			lightboxIsOpen: false,
		});
	}
	gotoPrevious () {
		this.setState({
			currentImage: this.state.currentImage - 1,
		});
	}
	gotoNext () {
		this.setState({
			currentImage: this.state.currentImage + 1,
		});
	}
	handleClickImage () {
		if (this.state.currentImage === this.props.thumbPaths.length - 1) return;

		this.gotoNext();
	}

	renderGallery() {

		const gallery = this.props.thumbPaths.map((thumb, i) => {
			return (
				<div className="cmptGalleryCard" key={i}>
					<div className="cmptGalleryCardImage" onClick={(e) => this.openLightbox(i, e)}>
						<img className="float-center" src={thumb} />
					</div>
				</div>
			);
		});

		return (
			<div>{gallery}</div>
		)
	}

	getFilename(filepath) {
		var base = new String(filepath).substring(filepath.lastIndexOf('/') + 1);
		if(base.lastIndexOf(".") != -1)
			base = base.substring(0, base.lastIndexOf("."));
		return base;
	}


	render() {

		const containerStyle = {
			// padding: 2
		};

		return (
			<div className="cmptPhotoGallery">
				<div className="cmptPhotoGalleryGrid">
					{this.props.thumbPaths.map((thumb, i) => (
						<div className="cmptGalleryCard" key={i}>
							<div className="cmptGalleryCardImage" onClick={(e) => this.openLightbox(i, e)}>
								<img className="float-center" src={thumb} />
							</div>
							<div className="cmptGalleryCardName">{this.getFilename(thumb)}</div>
						</div>
					))}
				</div>

				<Lightbox
					currentImage={this.state.currentImage}
					images={this.props.thumbPaths.map((thumb) => {
						let full  = thumb.replace('thumb','full');
						return {src: full}
					})}
					isOpen={this.state.lightboxIsOpen}
					onClickPrev={this.gotoPrevious.bind(this)}
					onClickNext={this.gotoNext.bind(this)}
					onClose={this.closeLightbox.bind(this)}
				/>
			</div>
		);
	}
}
