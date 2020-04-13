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
import { Redirect } from 'react-router-dom';
import Banner from './Banner';
import Footer from './Footer';
import { isAuthenticated } from '../../services/auth';
import ImageAdmin from './ImageAdmin';
import GalleryButton from './GalleryButton';
import { getImages } from '../../services/apiCalls';
import { Container, Content } from './styles';
import { getRandomInt } from '../../utils/functions';

class Admin extends Component {
  state = {
    isAuthenticated: undefined,
    MainComponent: undefined,
    images: undefined,
    activeGallery: '',
    galleries: [],
    buttons: [],
    addGalleryButton: null,
    showModal: false,
    newGallery: '',
  };

  setModelIsOpened = () => {
    let addGalleryButton;
    if (this.state.showModal) {
      addGalleryButton = this.addGalleryButton('button');
    } else {
      addGalleryButton = this.addGalleryButton('button active');
      this.cleanButtonsSelection();
    }

    this.setState({ showModal: !this.state.showModal, addGalleryButton });
  };

  updateButton = async (context) => {
    const gallery = Object.values(context.state.uploadedFiles);

    const buttons = this.state.buttons.map((button) => {
      if (context.props.galleryName === button.props.galleryName) {
        const { galleryName, className } = button.props;
        return this.returnGalleryButton(gallery, galleryName, className);
      }
      return button;
    });

    this.setState({ buttons });
  };

  returnGalleryButton = (gallery, name, className) => (
    <GalleryButton
      key={getRandomInt(1, 1000000)}
      gallery={gallery}
      galleryName={name}
      onClick={this.galleryButtonOnClick.bind(this)}
      className={className}
    />
  );

  addGalleryOnClick = () => {
    if (this.state.newGallery === '') return;
    const MainComponent = (
      <ImageAdmin
        gallery={null}
        galleryName={this.state.newGallery}
        updateButton={this.updateButton}
      />
    );
    const button = this.returnGalleryButton(
      [],
      this.state.newGallery,
      'button active',
    );

    const buttons = [].concat(...this.state.buttons, [button]);

    this.setState({
      buttons,
      MainComponent,
      activeGallery: this.state.newGallery,
      newGallery: '',
    });
    this.setModelIsOpened();
  };

  renderModal = () => (
    <Container>
      <Content>
        <label className="user">New Gallery</label>
        <input
          name="name"
          id="user"
          type="text"
          placeholder="Gallery name"
          onChange={(e) => this.setState({ newGallery: e.target.value })}
        />
        <p />
        <button className='button' onClick={this.addGalleryOnClick}>Add Gallery</button>
      </Content>
    </Container>
  );

  verifyAuthentication = async () => {
    try {
      await isAuthenticated();
      this.setState({ isAuthenticated: true });
    } catch (error) {
      console.log(error);
      this.setState({ isAuthenticated: false });
    }
  };

  fetchImages = async () => {
    try {
      const response = await getImages();

      const images = Object.entries(response).map((image) => image[1]);

      const MainComponent = (
        <ImageAdmin
          gallery={images[0]}
          galleryName={images[0][0].galleryName}
          updateButton={this.updateButton}
        />
      );

      this.fetchButtons(images);
      this.setState({
        MainComponent,
        images,
        activeGallery: images[0][0].galleryName,
      });
    } catch (error) {
      console.log(error);
    }
  };

  fetchButtons = (images) => {
    const buttons = images.map((image, idx) => {
      const className = idx === 0 ? 'button active' : 'button';
      return this.returnGalleryButton(image, image[0].galleryName, className);
    });
    this.setState({ buttons });
  };

  galleryButtonOnClick = (name) => {
    let props = [];
    if (this.state.showModal) this.setModelIsOpened();

    const buttons = this.state.buttons.map((button) => {
      let className;
      const { gallery, galleryName } = button.props;
      if (galleryName === name) {
        props = button.props;
        this.setState({ activeGallery: galleryName });
        className = 'button active';
      } else className = 'button';
      return this.returnGalleryButton(gallery, galleryName, className);
    });
    const MainComponent = (
      <ImageAdmin
        gallery={props.gallery}
        galleryName={props.galleryName}
        updateButton={this.updateButton}
      />
    );
    this.setState({ MainComponent, buttons });
  };

  cleanButtonsSelection = () => {
    const buttons = this.state.buttons.map((button) => {
      const { gallery, galleryName } = button.props;
      return this.returnGalleryButton(gallery, galleryName, 'button');
    });
    this.setState({ buttons });
  };

  componentDidMount() {
    this.setState({ addGalleryButton: this.addGalleryButton('button') });
    this.verifyAuthentication();
    this.fetchImages();
  }

  changeComponent = (component) => {
    this.setState({ MainComponent: component });
  };

  addGalleryButton = (className) => (
    <li>
      <button onClick={this.setModelIsOpened} className={className}>
        +
      </button>
    </li>
  );

  renderPage = () => (
      <div className="page-wrap-login">
        <section id="admin">
          <Banner />
          <section id="galleries">
            <div className="gallery">
              <header>
                <h1>{this.state.activeGallery}</h1>
                <ul className="tabs">
                  {this.state.buttons.map((button) => button)}
                  {this.state.addGalleryButton}
                </ul>
              </header>
              <div className="upload">
                {this.state.showModal
                  ? this.renderModal()
                  : this.state.MainComponent}
              </div>
            </div>
          </section>

          <Footer />
        </section>
      </div>
  )
  renderOrRedirect = () => {
    if (this.state.isAuthenticated) {
      return this.renderPage();
    }
    if (this.state.isAuthenticated === false) return <Redirect to={{ pathname: '/login' }} />;

    return null;
  };

  render() {
    return this.renderPage();
  }
}

export default Admin;
