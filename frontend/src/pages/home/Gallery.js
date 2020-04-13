/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-return-assign */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable radix */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable react/sort-comp */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { getImages } from '../../services/apiCalls';
import ImageGallery from 'react-image-gallery';
import { getRandomInt } from '../../utils/functions';
import GalleryButton from './GalleryButton';

const PREFIX_URL = 'https://raw.githubusercontent.com/xiaolin/react-image-gallery/master/static/';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: [],
      images: [],
      activeGallery: [],
      showIndex: false,
      showBullets: true,
      infinite: true,
      showThumbnails: true,
      showFullscreenButton: true,
      showGalleryFullscreenButton: true,
      showPlayButton: true,
      showGalleryPlayButton: true,
      showNav: true,
      isRTL: false,
      slideDuration: 450,
      slideInterval: 2000,
      slideOnThumbnailOver: true,
      thumbnailPosition: 'bottom',
      showVideo: {},
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.slideInterval !== prevState.slideInterval
      || this.state.slideDuration !== prevState.slideDuration
    ) {
      // refresh setInterval
      this._imageGallery.pause();
      this._imageGallery.play();
    }
  }

  _onImageClick(event) {
    console.debug(
      'clicked on image',
      event.target,
      'at index',
      // this.state._imageGallery.getCurrentIndex(),
    );
  }

  _onImageLoad(event) {
    console.debug('loaded image', event.target.src);
  }

  _onSlide(index) {
    this._resetVideo();
    console.debug('slid to index', index);
  }

  _onPause(index) {
    console.debug('paused on index', index);
  }

  _onScreenChange(fullScreenElement) {
    console.debug('isFullScreen?', !!fullScreenElement);
   /**
    *  const { prevClass, nextClass } = fullScreenElement
      ? { prevClass: '', nextClass: '-fullscreen' }
      : { prevClass: '-fullscreen', nextClass: '' };
    const docs = document.getElementsByClassName(`image-gallery-thumbnail-image${prevClass}`);
    Array.from(docs).map((doc) => {
      doc.className = `image-gallery-thumbnail-image${nextClass}`;
    });
    */
  }


  _onPlay(index) {
    console.debug('playing from index', index);
  }

  _handleInputChange(state, event) {
    this.setState({ [state]: event.target.value });
  }

  _handleCheckboxChange(state, event) {
    this.setState({ [state]: event.target.checked });
  }

  _handleThumbnailPositionChange(event) {
    this.setState({ thumbnailPosition: event.target.value });
  }

  _getStaticImages() {
    const images = [];
    for (let i = 2; i < 12; i++) {
      images.push({
        original: `${PREFIX_URL}${i}.jpg`,
        thumbnail: `${PREFIX_URL}${i}t.jpg`,
      });
    }

    return images;
  }

  _resetVideo() {
    this.setState({ showVideo: {} });

    if (this.state.showPlayButton) {
      this.setState({ showGalleryPlayButton: true });
    }

    if (this.state.showFullscreenButton) {
      this.setState({ showGalleryFullscreenButton: true });
    }
  }

  _toggleShowVideo(url) {
    // eslint-disable-next-line
    this.state.showVideo[url] = !this.state.showVideo[url];
    this.setState({
      showVideo: this.state.showVideo,
    });

    if (this.state.showVideo[url]) {
      if (this.state.showPlayButton) {
        this.setState({ showGalleryPlayButton: false });
      }

      if (this.state.showFullscreenButton) {
        this.setState({ showGalleryFullscreenButton: false });
      }
    }
  }

  restartComponent = () => {};

  _renderVideo(item) {
    return (
      <div>
        {this.state.showVideo[item.embedUrl] ? (
          <div className="video-wrapper">
            <a
              className="close-video"
              onClick={this._toggleShowVideo.bind(this, item.embedUrl)}
            />
            <iframe
              width="560"
              height="315"
              src={item.embedUrl}
              frameBorder="0"
              allowFullScreen
            />
          </div>
        ) : (
          <a onClick={this._toggleShowVideo.bind(this, item.embedUrl)}>
            <div className="play-button" />
            <img className="image-gallery-image" src={item.original} />
            {item.description && (
              <span
                className="image-gallery-description"
                style={{ right: '0', left: 'initial' }}
              >
                {item.description}
              </span>
            )}
          </a>
        )}
      </div>
    );
  }

  fetchImages = async () => {
    const images =   await getImages();
    const activeGallery = Object.values(images)[0];
    let buttons = [];
    Object.entries(images).map((image, idx) => {
      const className = idx === 0 ? 'button active' : 'button';
      buttons = [].concat(
        ...buttons,
        ...[this.returnButton(image[0], className)],
      );
      return image;
    });
    this.setState({ buttons, images, activeGallery });
  };

  returnButton = (name, className) => (
    <GalleryButton
      galleryName={name}
      key={getRandomInt(1, 1000000)}
      className={className}
      onClick={this.galleryButtonOnClick.bind(this)}
    />
  );

  returnGallery = (galleryName) => {
    try {
      return this.state.images[galleryName];
    } catch (error) {
      return [];
    }
  };

  galleryButtonOnClick = (galleryName) => {
    let activeGallery = [];

    const buttons = this.state.buttons.map((button) => {
      if (button.props.galleryName === galleryName) {
        activeGallery = this.returnGallery(galleryName);
        return this.returnButton(galleryName, 'button active');
      }
      return this.returnButton(button.props.galleryName, 'button');
    });

    this.setState({ buttons, activeGallery }, this.restartComponent);
  };

  componentDidMount() {
    this.fetchImages();
  }

  render() {
    const { activeGallery } = this.state;
    if (!activeGallery) return null;
    if (activeGallery.length === 0) return null;

    const images = activeGallery.map((image) => ({
      thumbnail: image.url,
      original: image.url,
    }));
    return (
      <section id="galleries">

        <div className="gallery">
          <header>
            <h1>Gallery</h1>
            <ul className="tabs">{this.state.buttons.map((button) => button)}</ul>
          </header>
          <div className='content'>
          <div id="gallery-container">
            <section className="app">
            <ImageGallery
                ref={(i) => (this._imageGallery = i)}
                items={images}
                lazyLoad={false}
                onClick={this._onImageClick.bind(this)}
                onImageLoad={this._onImageLoad}
                onSlide={this._onSlide.bind(this)}
                onPause={this._onPause.bind(this)}
                onScreenChange={this._onScreenChange.bind(this)}
                onPlay={this._onPlay.bind(this)}
                infinite={this.state.infinite}
                showBullets={this.state.showBullets}
                showFullscreenButton={
                  this.state.showFullscreenButton
                  && this.state.showGalleryFullscreenButton
                }
                showPlayButton={
                  this.state.showPlayButton && this.state.showGalleryPlayButton
                }
                showThumbnails={this.state.showThumbnails}
                showIndex={this.state.showIndex}
                showNav={this.state.showNav}
                isRTL={this.state.isRTL}
                thumbnailPosition={this.state.thumbnailPosition}
                slideDuration={parseInt(this.state.slideDuration)}
                slideInterval={parseInt(this.state.slideInterval)}
                slideOnThumbnailOver={this.state.slideOnThumbnailOver}
                additionalClass="app-image-gallery"
              />
            </section>
          </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Gallery;
