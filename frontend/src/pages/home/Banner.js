import React from 'react';

const Banner = () => (
  <section id="banner">
    <div className="inner">
      <h1>Hey, I'm Snapshot</h1>
      <p>
        A fully responsive gallery template edited by
        {' '}
        <a href="https://www.instagram.com/thidiamondsoftwares/">THIAGO SANTANA</a>
      </p>
      <ul className="actions">
        <li>
          <a href="/admin" className="button alt scrolly big">
           Go to Admin Area
          </a>
        </li>
      </ul>
    </div>
  </section>
);

export default Banner;
