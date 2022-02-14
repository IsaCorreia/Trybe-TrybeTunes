import propTypes, { oneOfType } from 'prop-types';
import React, { Component } from 'react';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    isChecked: false,
  }

  componentDidMount() {
    this.isCheckboxClean();
  }

  isCheckboxClean = async () => {
    const { loadingChange, item: { trackId } } = this.props;
    loadingChange(true);
    const favs = await getFavoriteSongs();
    if (favs) {
      const isTrackEqual = favs.some((item) => item.trackId === trackId);
      this.setState({ isChecked: isTrackEqual });
    } else {
      this.setState({ isChecked: false });
    }
    loadingChange(false);
  }

  onCheckedHandler = async () => {
    const { loadingChange, item } = this.props;
    const { isChecked } = this.state;
    loadingChange(true);
    if (!isChecked) {
      await addSong(item);
      this.setState({ isChecked: true });
    } else {
      await removeSong(item);
      // this.isCheckboxClean();
      this.setState({ isChecked: false });
    }
    loadingChange(false);
  };

  render() {
    const { item: { trackName, previewUrl, trackId } } = this.props;
    const { isChecked } = this.state;
    return (
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
    );
  }
}

MusicCard.propTypes = {
  loadingChange: propTypes.func.isRequired,
  item: propTypes.objectOf(oneOfType([
    propTypes.string,
    propTypes.number,
    propTypes.bool])).isRequired,
};

export default MusicCard;
