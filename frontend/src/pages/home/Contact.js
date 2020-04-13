/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { sendEmail } from '../../services/apiCalls';

class Contact extends Component {
  state = {
    name: '',
    email: '',
    text: '',
  };

  clearForm = () => {
    this.setState({ name: '', email: '', text: '' });
  };

  buttonSendOnClick = async () => {
    const { name, email, text } = this.state;
    if (name === '' || email === '' || text === '') return;
    try {
      await sendEmail(email, name, text);
      this.clearForm();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { name, email, text } = this.state;
    return (
      <section id="contact">
        <div className="social column">
          <h3>About Me</h3>
          <p>
            Mus sed interdum nunc dictum rutrum scelerisque erat a parturient
            condimentum potenti dapibus vestibulum condimentum per tristique
            porta. Torquent a ut consectetur a vel ullamcorper a commodo a
            mattis ipsum class quam sed eros vestibulum quisque a eu nulla
            scelerisque a elementum vestibulum.
          </p>
          <p>
            Aliquet dolor ultricies sem rhoncus dolor ullamcorper pharetra dis
            condimentum ullamcorper rutrum vehicula id nisi vel aptent orci
            litora hendrerit penatibus erat ad sit. In a semper velit eleifend a
            viverra adipiscing a phasellus urna praesent parturient integer
            ultrices montes parturient suscipit posuere quis aenean. Parturient
            euismod ultricies commodo arcu elementum suspendisse id dictumst at
            ut vestibulum conubia quisque a himenaeos dictum proin dis purus
            integer mollis parturient eros scelerisque dis libero parturient
            magnis.
          </p>
          <h3>Follow Me</h3>
          <ul className="icons">
            <li>
              <a href="http://www.google.com" className="icon fa-twitter">
                <span className="label">Twitter</span>
              </a>
            </li>
            <li>
              <a href="http://www.google.com" className="icon fa-facebook">
                <span className="label">Facebook</span>
              </a>
            </li>
            <li>
              <a href="http://www.google.com" className="icon fa-instagram">
                <span className="label">Instagram</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="column">
          <h3>Get it touch</h3>
          <form action="" method="post">
            <div className="field half first">
              <label className="name">Name</label>
              <input
                name="name"
                id="name"
                placeholder="Name"
                type="text"
                value={name}
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </div>
            <div>
              <div className="field half">
                <label className="email">Email</label>
                <input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
              </div>
              <div className="field">
                <label className="message">Message</label>
                <textarea
                  name="message"
                  id="message"
                  rows="6"
                  placeholder="Message"
                  value={text}
                  onChange={(e) => this.setState({ text: e.target.value })}
                />
              </div>
              <ul className="actions">
                <li>
                  <input
                    value="Send Message"
                    className="button"
                    type="button"
                    onClick={this.buttonSendOnClick}
                  />
                </li>
              </ul>
            </div>
          </form>
        </div>
      </section>
    );
  }
}
export default Contact;
