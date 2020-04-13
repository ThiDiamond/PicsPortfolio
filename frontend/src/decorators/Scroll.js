/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/no-deprecated */
import React, { Component } from 'react';

class Scroll extends Component {
  constructor() {
    super();

    // Initial scroll position
    this.state = {
      scrollPosition: this.getWindowScrollTop(),
    };

    // Bind handlers
    this.handleInterval = this.handleInterval.bind(this);
    this.handleRequestAnimationFrame = this.handleRequestAnimationFrame.bind(
      this,
    );
  }

  componentWillMount() {
    // 50 times per second, change to your needs
    const INTERVAL = 20;// 20;
    this.intervalID = setInterval(this.handleInterval, INTERVAL);
  }

  componentWillUnmount() {
    // Remove and reset interval/animationFrame
    clearInterval(this.intervalID);
    cancelAnimationFrame(this.requestID);
    this.requestID = null;
    this.intervalID = null;
  }

  getWindowScrollTop() {
    // Get scroll position, with IE fallback
    return window.pageYOffset || document.documentElement.scrollTop;
  }

  handleInterval() {
    // Interval is only used to throttle animation frame
    cancelAnimationFrame(this.requestID);
    this.requestID = requestAnimationFrame(this.handleRequestAnimationFrame);
  }

  handleRequestAnimationFrame() {
    const { scrollPosition } = this.state;
    const newScrollPosition = this.getWindowScrollTop();

    // Update the state only when scroll position is changed
    if (newScrollPosition !== scrollPosition) {
      this.setState({
        scrollPosition: newScrollPosition,
      });
    }
  }

  render() {
    const { scrollPosition } = this.state;
    const { children } = this.props;
    const childrenWithProps = React.Children.map(children,
      (child) => React.cloneElement(child, { ...this.props, scrollPosition }));
    return (
      <>
        {childrenWithProps}
      </>
    );
  }
}

export default Scroll;
