import React from 'react';
import Footer from './Footer';
import Form from './Form';
import Banner from './Banner';

const Login = () => (
  <div className="page-wrap-login">
    <section id="login">
      <Banner />
      <Form />
      <Footer />
    </section>
  </div>
);


export default Login;
