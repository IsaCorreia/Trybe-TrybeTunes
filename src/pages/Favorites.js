import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class Favorites extends Component {
  state = {
    loading: false,
    favTracks: [],
  };

  componentDidMount() {
    this.renderFavorites();
  }

  loadingChange = (change) => {
    this.renderFavorites();
    this.setState({ loading: change });
  }

  renderFavorites = async () => {
    this.setState({ loading: true });
    const favs = await getFavoriteSongs();
    this.setState({ favTracks: favs }, () => this.setState({ loading: false }));
  };

  render() {
    const { loading, favTracks } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <h1>Favoritos ⭐</h1>
        {loading && <Loading />}
        {favTracks.map((item) => (
          <MusicCard
            key={ item.trackId }
            item={ item }
            loadingChange={ this.loadingChange }
          />
        ))}
      </div>
    );
  }
}

// Favorites.propTypes = {

// };

export default Favorites;
