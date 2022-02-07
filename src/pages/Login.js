import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Login extends Component {
  render() {
    const { onNameInputChange, isButtonDisabled } = this.props;
    return (
      <div data-testid="page-login">
        <h1>Login 🔑</h1>
        <input
          data-testid="login-name-input"
          type="text"
          onChange={ onNameInputChange }
        />
        <button
          data-testid="login-submit-button"
          type="button"
          disabled={ isButtonDisabled }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  onNameInputChange: PropTypes.func.isRequired,
  isButtonDisabled: PropTypes.bool.isRequired,
};

export default Login;
