import propTypes, { oneOfType } from 'prop-types';
import React, { Component } from 'react';
import Loading from '../pages/Loading';
import {
  addSong,
  getFavoriteSongs,
  removeSong,
} from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    isChecked: false,
    loading: false,
  };

  componentDidMount() {
    this.isCheckboxClean();
  }

  loadingChange = (change) => {
    const { renderFavorites } = this.props;
    if (renderFavorites !== undefined) renderFavorites();
    this.setState({ loading: change });
  };

  isCheckboxClean = async () => {
    const {
      item: { trackId },
      changeTracks,
    } = this.props;
    this.loadingChange(true);
    const favs = await getFavoriteSongs();
    changeTracks(favs);
    if (favs) {
      const isTrackEqual = favs.some((item) => item.trackId === trackId);
      this.setState({ isChecked: isTrackEqual });
    } else {
      this.setState({ isChecked: false });
    }
    this.loadingChange(false);
  };

  onCheckedHandler = async () => {
    const { item, changeTracks } = this.props;
    const { isChecked } = this.state;
    this.loadingChange(true);
    if (!isChecked) {
      await addSong(item);
      this.setState({ isChecked: true });
    } else {
      await removeSong(item);
      this.setState({ isChecked: false });
    }
    const favs = await getFavoriteSongs();
    changeTracks(favs);
    this.loadingChange(false);
  };

  render() {
    const {
      item: { trackName, previewUrl, trackId },
    } = this.props;
    const { isChecked, loading } = this.state;
    return (
      <>
        {loading && <Loading />}
        {!loading && (
          <div className="audio-preview">
            <p>{trackName}</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
            <label htmlFor="favorite-button">
              Favorita
              <input
                data-testid={ `checkbox-music-${trackId}` }
                id="favorite-button"
                type="checkbox"
                checked={ isChecked }
                onChange={ this.onCheckedHandler }
              />
            </label>
          </div>
        )}
      </>
    );
  }
}

MusicCard.propTypes = {
  renderFavorites: propTypes.func.isRequired,
  changeTracks: propTypes.func.isRequired,
  item: propTypes.objectOf(
    oneOfType([propTypes.string, propTypes.number, propTypes.bool]),
  ).isRequired,
};

export default MusicCard;
