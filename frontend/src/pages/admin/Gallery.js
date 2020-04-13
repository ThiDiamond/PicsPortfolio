/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
/* eslint-disable radix */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/sort-comp */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { getImages } from '../../services/apiCalls';
import GalleryButton from './GalleryButton';
import ImageAdmin from './ImageAdmin';

class Gallery extends Component {
  state = {
    galleryOpened: false,
    title: 'Whats\'s New',
    galleries: this.props.galleries,
    activeGallery: { images: [], Component },
  };

  toggleGallery = () => {
    this.setState((prevState) => ({
      galleryOpened: !prevState.galleryOpened,
    }));
  };

  fetchButtons = (gallery) => (gallery.name === this.state.galleries[0].name ? (
    <GalleryButton
      gallery={gallery}
      onClick={this.galleryButtonOnClick}
      className="button active"
    />
  ) : (
    <GalleryButton
      gallery={gallery}
      onClick={this.galleryButtonOnClick}
      className="button"
    />
  ));

  galleryButtonOnClick = (gallery) => {
    const buttons = this.state.buttons.map((button) => {
      button.name === gallery.name
        ? (button.className = 'button active')
        : (button.className = 'button');
      return button;
    });
    this.setState({
      buttons,
      activeGallery: gallery,
      Component: <ImageAdmin data={gallery} />,
    });
  };

  renderImage = (image) => (
    <div className="media">
      <img
        alt=""
        width="450px"
        height="450px"
        src={this.state.activeGallery.images.url}
        onClick={this.toggleGallery}
      />
    </div>
  );

  fetchImageAdmin = () => {
    getImages().then((response) => {
      console.log(response.data);
    });
  };

  componentDidMount() {
    this.setState({ activeGallery: this.props.galleries[0] });
  }

  render() {
    return (
      <section id="galleries">
        <div className="gallery">
          <header>
            <h1>Gallery</h1>
            <ul className="tabs">
              {this.state.galleries.map(this.fetchButtons)}
            </ul>
          </header>

          <div className="content">{this.state.activeGallery.Component}</div>
        </div>
      </section>
    );
  }
}

export default Gallery;
