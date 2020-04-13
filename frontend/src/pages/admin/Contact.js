/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
/* eslint-disable radix */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
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
import ContentEditable from 'react-contenteditable';

class Contact extends Component {
  state = {
    descTitle: 'About Me',
    descBody: `Mus sed interdum nunc dictum rutrum scelerisque erat a parturient condimentum
         potenti dapibus vestibulum condimentum per tristique porta. Torquent a ut
          consectetur a vel ullamcorper a commodo a mattis ipsum class quam sed eros
           vestibulum quisque a eu nulla scelerisque a elementum vestibulum.
        Aliquet dolor ultricies sem rhoncus dolor ullamcorper pharetra dis condimentum
         ullamcorper rutrum vehicula id nisi vel aptent orci litora hendrerit penatibus erat ad sit. In a semper velit eleifend a viverra adipiscing a phasellus urna praesent parturient integer ultrices montes parturient suscipit posuere quis aenean. Parturient euismod ultricies commodo arcu elementum suspendisse id dictumst at ut vestibulum conubia quisque a himenaeos dictum proin dis purus integer mollis parturient eros scelerisque dis libero parturient magnis.</p>
        `,
    descEnd: 'Follow Me',
    formTitle: 'Get it touch',
  };

  render() {
    return (
      <section id="contact">
        <div className="social column">
          <ContentEditable
            innerRef={React.createRef()}
            html={this.state.descTitle} // innerHTML of the editable div
            disabled={false} // use true to disable editing
            onChange={(evt) => {
              this.setState({ descTitle: evt.target.value });
            }} // handle innerHTML change
            tagName="h3" // Use a custom HTML tag (uses a div by default)
          />

          <ContentEditable
            innerRef={React.createRef()}
            html={this.state.descBody} // innerHTML of the editable div
            disabled={false} // use true to disable editing
            onChange={(evt) => {
              this.setState({ descBody: evt.target.value });
            }} // handle innerHTML change
            tagName="p" // Use a custom HTML tag (uses a div by default)
          />
          <ContentEditable
            innerRef={React.createRef()}
            html={this.state.descEnd} // innerHTML of the editable div
            disabled={false} // use true to disable editing
            onChange={(evt) => {
              this.setState({ descEnd: evt.target.value });
            }} // handle innerHTML change
            tagName="h3" // Use a custom HTML tag (uses a div by default)
          />
          <ul className="icons">
            <li className="icon fa-twitter">
              <span className="label">Twitter</span>
            </li>
            <li className="icon fa-facebook">
              <span className="label">Facebook</span>
            </li>
            <li className="icon fa-instagram">
              <span className="label">Instagram</span>
            </li>
          </ul>
        </div>

        <div className="column">
          <h3>
            <ContentEditable
              innerRef={React.createRef()}
              html={this.state.formTitle} // innerHTML of the editable div
              disabled={false} // use true to disable editing
              onChange={(evt) => {
                this.setState({ formTitle: evt.target.value });
              }} // handle innerHTML change
              // tagName='article' Use a custom HTML tag (uses a div by default)
            />
          </h3>
          <form action="#" method="post">
            <div className="field half first">
              <label className="name">Name</label>
              <input name="name" id="name" type="text" />
            </div>
            <div>
              <div className="field half">
                <label className="email">Email</label>
                <input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div className="field">
                <label className="message">Message</label>
                <textarea
                  name="message"
                  id="message"
                  rows="6"
                  placeholder="Message"
                />
              </div>
              <ul className="actions">
                <li>
                  <input
                    value="Send Message"
                    className="button"
                    type="submit"
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
