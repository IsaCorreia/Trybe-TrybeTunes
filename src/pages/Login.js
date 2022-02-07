import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <div data-testid="page-login">
        <h1>Login 🔑</h1>
        <input
          data-testid="login-name-input"
          type="text"
        />
        <button
          data-testid="login-submit-button"
          type="button"
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
