import React, { Component } from 'react';
import Navbar from './Navbar';
import Banner from './Banner';
import Contact from './Contact';
import Footer from './Footer';
import Generic from './Generic';
import Gallery from './Gallery';
import Scroll from '../../decorators/Scroll';

class Home extends Component {
  toggleGallery = () => {
    this.setState((prevState) => ({
      galleryOpened: !prevState.galleryOpened,
    }));
  };

  render() {
    return (
      <>
        <Scroll>
            <Navbar />
          </Scroll>
        <div className="page-wrap">


          <section id="main">
            <Banner />
            <div id="gallery" />
            <Gallery />
            <Generic />
            <Contact />
            <Footer />
          </section>
        </div>
      </>
    );
  }
}

export default Home;
