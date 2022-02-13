import { nanoid } from 'nanoid';
import propTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import SearchResults from '../components/SearchResults';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

const NO_RESULTS_FOUND = 'Nenhum álbum foi encontrado';

class Search extends Component {
  state = {
    isButtonDisabled: true,
    loading: false,
    searchInputValue: '',
  };

  componentDidMount() {
    const { seeMoreOnClick } = this.props;
    this.setState(seeMoreOnClick);
  }

  onNameInputChange = (event) => {
    const { value } = event.target;
    const MIN_STRING_LENGTH = 2;
    const buttonState = !(value.length >= MIN_STRING_LENGTH || false);
    this.setState({
      isButtonDisabled: buttonState,
      searchInputValue: value,
    });
  };

  clearsSearchInput = async () => {
    const { searchInputValue } = this.state;
    this.setState({ loading: true });
    let searchResults = await searchAlbumsAPI(searchInputValue);
    if (searchResults.length === 0) searchResults = NO_RESULTS_FOUND;
    this.setState({
      results: true,
      searchResults,
      artist: searchInputValue,
      searchInputValue: '',
      loading: false,
    });
  };

  rendersSearchResults = () => {
    const { searchResults } = this.state;
    const { seeMoreOnClick } = this.props;
    if (searchResults === NO_RESULTS_FOUND) {
      return <p>Nenhum álbum foi encontrado</p>;
    }
    return searchResults.map((item) => (
      <SearchResults
        key={ nanoid() }
        { ...item }
        seeMoreOnClick={ seeMoreOnClick }
      />
    ));
  };

  render() {
    const { isButtonDisabled, searchInputValue, results, loading, artist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Pesquisar 🔎</h1>
        {loading && <Loading />}
        {!loading && (
          <>
            <input
              data-testid="search-artist-input"
              type="text"
              onChange={ this.onNameInputChange }
              value={ searchInputValue }
            />
            <button
              data-testid="search-artist-button"
              type="button"
              disabled={ isButtonDisabled }
              onClick={ this.clearsSearchInput }
            >
              Pesquisar
            </button>
          </>
        )}

        {results && (
          <>
            <p>
              Resultado de álbuns de:
              {' '}
              {artist}
            </p>
            <div className="search-results">{this.rendersSearchResults()}</div>
          </>
        )}
      </div>
    );
  }
}

Search.propTypes = {
  seeMoreOnClick: propTypes.func.isRequired,
};

export default Search;
