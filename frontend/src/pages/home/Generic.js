import React from 'react';
import img1 from '../../images/pic01.jpg';
import img2 from '../../images/pic02.jpg';

const Generic = () => (
  <section>
    <div id="generic" />
    <div className="inner">
      <header>
        <h1>Generic</h1>
      </header>
      <p>
        Faucibus parturient mus phasellus vestibulum suspendisse dui vel
        ridiculus nibh diam placerat tellus scelerisque facilisi mus vestibulum
        arcu mus praesent in blandit. Conubia ullamcorper cum rhoncus vitae
        dapibus venenatis integer in donec egestas lacus nibh vestibulum
        habitasse accumsan parturient malesuada sociis auctor scelerisque
        vehicula urna eu proin euismod. Id facilisi suspendisse parturient leo
        mus condimentum natoque scelerisque ullamcorper odio tristique ultricies
        arcu ac condimentum facilisi scelerisque class commodo. Scelerisque
        sagittis magna mi duis iaculis id erat pharetra vestibulum condimentum
        hac suspendisse tempor leo aliquet penatibus parturient donec parturient
        parturient. Vehicula suspendisse sem a adipiscing est ad donec ultricies
        senectus magnis convallis a fringilla adipiscing vulputate dui elementum
        diam ipsum eleifend condimentum placerat facilisi viverra mollis
        scelerisque. Commodo cum vestibulum hendrerit sit condimentum at rutrum
        vulputate scelerisque erat convallis himenaeos consequat a hac ultrices
        nam vel suspendisse nascetur dictum vulputate sed at.
      </p>
      <h2>Ultricies Senectus Magnis</h2>

      <p>
        Scelerisque sagittis magna mi duis iaculis id erat pharetra vestibulum
        condimentum hac suspendisse tempor leo aliquet penatibus parturient
        donec parturient parturient. Vehicula suspendisse sem a adipiscing est
        ad donec ultricies senectus magnis convallis a fringilla adipiscing
        vulputate dui elementum diam ipsum eleifend condimentum placerat
        facilisi viverra mollis scelerisque. Commodo cum vestibulum hendrerit
        sit condimentum at rutrum vulputate scelerisque erat convallis himenaeos
        consequat a hac ultrices nam vel suspendisse nascetur dictum vulputate
        sed at.
      </p>
      <section className="columns double">
        <div className="column">
          <span className="image left special">
            <img src={img1} alt="" />
          </span>
          <h3>Parturient Consequat Neque</h3>
          <p>
            Adipiscing dis a mus a convallis condimentum molestie penatibus
            iaculis pulvinar vestibulum enim lacus suscipit mi dictumst
            hendrerit sit condimentum at rutrum vulputate vestibulum habitasse
            nam fusce a nascetur. Ut ullamcorper suspendisse malesuada tempus
            vestibulum commodo habitasse suspendisse magnis.
          </p>
        </div>
        <div className="column">
          <span className="image left special">
            <img src={img2} alt="" />
          </span>
          <h3>Ridiculus Torquent Quam Accumsan</h3>
          <p>
            At sem phasellus elit class dapibus lectus posuere donec morbi in
            cras commodo faucibus ipsum vehicula fringilla. Risus hendrerit sit
            condimentum at rutrum vulputate fringilla dis curae metus ipsum
            imperdiet vulputate sapien dolorem ligula sapien curae consequat
            vestibulum urna. Nulla vulputate cum augue non arcu.
          </p>
        </div>
      </section>
    </div>
  </section>
);

export default Generic;