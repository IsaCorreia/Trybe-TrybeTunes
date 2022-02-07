import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
// import PropTypes from 'prop-types';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      nameInput: '',
      isButtonDisabled: true,
      isLoading: false,
      isUserOk: false,
    };
  }

  inputHandler = (event) => {
    // Recebe input do campo text,
    const { value: input } = event.target;
    const MIN_STRING_LENGTH = 3;

    // Caso o seu comprimento (string) seja maior que 3
    if (input.length >= MIN_STRING_LENGTH) {
      // Ativa os estados que controlam
      // Nome do usuário (para enviar para createUser)
      // e o botão de enviar
      this.setState({
        nameInput: input,
        isButtonDisabled: false,
      });
    } else {
      // Caso contrário mantém o botão desativado
      this.setState({
        isButtonDisabled: true,
      });
    }
  };

  onClickHandler = () => {
    const { nameInput } = this.state;
    createUser({ name: nameInput })
      .then(this.setState({ isUserOk: true }));
  }

  redirectPage = () => <Redirect to="/search" />

  render() {
    const { isButtonDisabled, isLoading, isUserOk } = this.state;
    return (
      <div data-testid="page-login">
        <h1>Login 🔑</h1>
        <input
          data-testid="login-name-input"
          type="text"
          onChange={ this.inputHandler }
        />
        <button
          data-testid="login-submit-button"
          type="button"
          disabled={ isButtonDisabled }
          onClick={ this.onClickHandler }
        >
          Entrar
        </button>
        {isLoading ? <Loading /> : null}
        {isUserOk ? this.redirectPage() : null}
      </div>
    );
  }
}

// Login.propTypes = {

// };

export default Login;
