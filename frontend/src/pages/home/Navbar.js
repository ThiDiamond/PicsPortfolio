/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable new-cap */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/sort-comp */
import React from 'react';

class Navbar extends React.Component {
  getClassName = (name, condition) => (condition ? 'active' : '')

  handleLoad = (e) => {
    const gallery = document.getElementById('gallery').offsetTop;
    const generic = document.getElementById('generic').offsetTop;
    const contact = document.getElementById('contact').offsetTop;
    const end = document.getElementById('end').offsetTop;


    this.divsLimit = {
      gallery:
        { min: 0, max: generic },
      generic:
        { min: generic, max: contact },

      contact:
        { min: contact, max: end },

    };
  }

  isDivTopReached = (divId, scrollPosition) => {
    try {
      return this.divsTop[divId] <= scrollPosition;
    } catch (error) {
      return false;
    }
  };

  componentDidMount() {
    window.addEventListener('load', this.handleLoad);
  }

  isOnDiv = (name, scrollPosition) => {
    try {
      return !!(scrollPosition >= this.divsLimit[name].min
        && scrollPosition <= this.divsLimit[name].max);
    } catch (error) {
      return false;
    }
  }

  scrollTo = (name) => {
    try {
      const to = name === 'gallery'
        ? document.getElementById('gallery').offsetTop
        : this.divsLimit[name].min + 10;

      window.scrollTo(0, to);
    } catch (error) {
      console.log('Page not loaded fully');
    }
  }

  render() {
    const { scrollPosition } = this.props;
    const isGallery = this.isOnDiv('gallery', scrollPosition);
    const isGeneric = this.isOnDiv('generic', scrollPosition);
    const isContact = this.isOnDiv('contact', scrollPosition);

    return (
      <nav id="nav">
        <ul>
          <li>
            <a
              className={this.getClassName('gallery', isGallery)}
              onClick={() => {
                this.scrollTo('gallery');
              }}
            >
              <span className="icon fa-camera-retro" />
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                this.scrollTo('generic');
              }}
              className={this.getClassName('generic', isGeneric)}
            >
              <span className="icon fa-home" />
            </a>
          </li>
          <li>
            <a
              className={this.getClassName('contact', isContact)}
              onClick={() => {
                this.scrollTo('contact');
              }}
            >
              <span className="icon fa-file-text-o" />
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}
export default Navbar;
