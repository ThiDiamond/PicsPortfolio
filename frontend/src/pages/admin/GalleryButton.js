/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';

class GalleryButton extends Component {
  onClick = () => {
    if (this.props.className === 'button') this.props.onClick(this.returnName());
  };

  returnName = () => this.props.galleryName;

  render() {
    return (
      <li>
        <button onClick={this.onClick} className={this.props.className}>
          {this.returnName()}
        </button>
      </li>
    );
  }
}

export default GalleryButton;
