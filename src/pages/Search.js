import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    isButtonDisabled: true,
  };

  onNameInputChange = (event) => {
    const { value } = event.target;
    const MIN_STRING_LENGTH = 2;
    const buttonState = !(value.length >= MIN_STRING_LENGTH || false);
    this.setState({
      isButtonDisabled: buttonState,
      // userName: value,
    });
  };

  render() {
    const { isButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Pesquisar 🔎</h1>
        <input
          data-testid="search-artist-input"
          type="text"
          onChange={ this.onNameInputChange }
        />
        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ isButtonDisabled }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
