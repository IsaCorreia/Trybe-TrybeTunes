import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Header from '../components/Header';

class Favorites extends Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
        <h1>Favoritos ⭐</h1>
      </div>
    );
  }
}

// Favorites.propTypes = {

// };

export default Favorites;
