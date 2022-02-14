import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  state = {
    // loading: false,
    favTracks: [],
  };

  componentDidMount() {
    this.renderFavorites();
  }

  renderFavorites = async () => {
    // this.setState({ loading: true });
    const favs = await getFavoriteSongs();
    this.setState({ favTracks: favs });
  };

  changeTracks = (changedArr) => {
    this.setState({ favTracks: changedArr });
  }

  render() {
    const { favTracks } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <h1>Favoritos ⭐</h1>
        {favTracks.map((item) => (
          <MusicCard
            key={ item.trackId }
            item={ item }
            renderFavorites={ this.renderFavorites }
            changeTracks={ this.changeTracks }
          />
        ))}
      </div>
    );
  }
}

// Favorites.propTypes = {

// };

export default Favorites;
