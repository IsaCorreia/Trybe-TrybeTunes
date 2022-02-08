import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Header from '../components/Header';

class Album extends Component {
  render() {
    return (
      <div data-testid="page-album">
        <Header />
        <h1>Album 🎵</h1>
      </div>
    );
  }
}

// Album.propTypes = {

// };

export default Album;
