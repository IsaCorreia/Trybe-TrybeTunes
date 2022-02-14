import propTypes, { objectOf, oneOfType } from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';

class Album extends Component {
  state = { loading: false, tracksInfo: [], albumInfo: {} };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const collectionInfo = await getMusics(id);
    // this.getsAlbum(collectionInfo);
    const tracksInfo = collectionInfo.slice(1);
    this.setState({ albumInfo: collectionInfo[0], tracksInfo });
  }

  getsAlbum = (collectionInfo) => {
    const albumInfo = collectionInfo.find(
      (item) => item.wrapperType === 'collection',
    );
    const tracksInfo = collectionInfo.filter(
      (item) => item.wrapperType === 'track',
    );
    this.setState({ albumInfo, tracksInfo });
  };

  loadingChange = (change) => {
    this.setState({ loading: change });
  }

  render() {
    const { albumInfo, tracksInfo, loading } = this.state;
    return (
      <>
        <Header />
        <h1>Album 🎵</h1>
        <div data-testid="page-album">
          <div className="collection-info">
            {/* {albumInfo && ( */}
            <p data-testid="artist-name">{albumInfo && albumInfo.artistName}</p>
            {/* <img
              src={ albumInfo.artworkUrl100 }
              alt={ albumInfo.collectionName }
            /> */}

            <p data-testid="album-name">{albumInfo && albumInfo.collectionName}</p>
            {/* )} */}
          </div>
          <div className="musics">
            {loading && <Loading />}
            {
              tracksInfo.map((item) => (
                <MusicCard
                  key={ item.trackId }
                  item={ item }
                  loadingChange={ this.loadingChange }
                />
              ))
            }
          </div>
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: propTypes.objectOf(oneOfType([
    propTypes.bool,
    propTypes.string,
    objectOf(oneOfType([
      propTypes.string,
    ])),
  ])).isRequired,
};

export default Album;
