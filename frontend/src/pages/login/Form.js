/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { login } from '../../services/auth';
import api from '../../services/api';

class Form extends Component {
  state = {
    isLogged: false,
    error: '',
    username: '',
    password: '',
  };

  handleLogin = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    if (!username || !password) {
      this.setState({ error: 'Preencha e-mail e senha para continuar!' });
    } else {
      try {
        const response = await api.post('/public/login', {
          username,
          password,
        });
        login(response.data.token);
        this.setState({ isLogged: true });
      } catch (err) {
        console.log(err);

        this.setState({
          error: 'Houve um problema com o login, verifique suas credenciais.',
        });
      }
    }
  };

  render() {
    return (
      <div id="login">
        {this.state.isLogged ? <Redirect to={{ pathname: '/admin' }} /> : true}
        <div className="column">
          <h3>Admin Access</h3>
          <center>
            <form action="#">
              {this.state.error && <p>{this.state.error}</p>}
              <div className="field half first">
                <label className="user">User</label>
                <input
                  name="user"
                  id="user"
                  type="text"
                  placeholder="Username"
                  onChange={(e) => this.setState({ username: e.target.value })}
                />
              </div>
              <div>
                <div className="field half">
                  <label className="password">Password</label>
                  <input
                    name="password"
                    id="password"
                    type="password"
                    onChange={(e) => this.setState({ password: e.target.value })}
                    placeholder="Password"
                  />
                </div>

                <ul className="actions">
                  <li>
                    <input
                      value="Login"
                      readOnly
                      onClick={this.handleLogin}
                      className="button"
                    />
                  </li>
                </ul>
              </div>
            </form>
          </center>
        </div>
      </div>
    );
  }
}

export default Form;
