import propTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  render() {
    const { userName } = this.props;
    return (
      <div data-testid="page-search">
        <Header userName={ userName } />
        <h1>Search 🔎</h1>
      </div>
    );
  }
}

Search.propTypes = {
  userName: propTypes.string.isRequired,
};

export default Search;
