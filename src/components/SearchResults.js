import propTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SearchResults extends Component {
  render() {
    const { artistName, collectionId, collectionName, artworkUrl100 } = this.props;
    return (
      <div className="album-card">
        <img src={ artworkUrl100 } alt={ `capa do álbum ${collectionName}` } />
        <h3>{collectionName}</h3>
        <h4>{artistName}</h4>
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `/album/${collectionId}` }
        >
          Ver mais
        </Link>
      </div>
    );
  }
}

SearchResults.propTypes = {
  artistName: propTypes.string.isRequired,
  collectionId: propTypes.string.isRequired,
  collectionName: propTypes.string.isRequired,
  artworkUrl100: propTypes.string.isRequired,
};

export default SearchResults;
