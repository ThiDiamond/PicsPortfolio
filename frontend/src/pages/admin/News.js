/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/sort-comp */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { ReactBnbGallery } from 'react-bnb-gallery';
import ContentEditable from 'react-contenteditable';

class News extends Component {
  state = {
    galleryOpened: false,
    title: 'Whats\'s New',
    gallery: { images: [] },
  };

  toggleGallery = () => {
    this.setState((prevState) => ({
      galleryOpened: !prevState.galleryOpened,
    }));
  };

  renderImage = (image) => (
    <div className="media">
      <img
        alt=""
        width="450px"
        height="450px"
        src={image.url}
        onClick={this.toggleGallery}
      />
    </div>
  );

  componentDidMount() {
    this.props.galleries.map((gallery) => {
      if (gallery.name === 'news') this.setState({ gallery });
    });
  }

  render() {
    return (
      <section id="galleries">
        <div className="gallery">
          <header className="special">
            <ContentEditable
              innerRef={React.createRef()}
              html={this.state.title} // innerHTML of the editable div
              disabled={false} // use true to disable editing
              onChange={(evt) => {
                this.setState({ title: evt.target.value });
              }} // handle innerHTML change
              tagName="h2" // Use a custom HTML tag (uses a div by default)
            />
          </header>
          <div className="content">
            {this.state.gallery.images.map(this.renderImage)}
          </div>

          <ReactBnbGallery
            show={this.state.galleryOpened}
            photos={this.state.gallery.images.map((image) => image.url)}
            onClose={this.toggleGallery}
          />

          <footer>
            <a href="gallery.html" className="button big">
              Full Gallery
            </a>
          </footer>
        </div>
      </section>
    );
  }
}
export default News;
