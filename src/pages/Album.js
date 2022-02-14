import propTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';

class Album extends Component {
  state = { loading: false, tracksInfo: [], albumInfo: {} };

  async componentDidMount() {
    const { collectionId } = this.props;
    const collectionInfo = await getMusics(collectionId);
    this.getsAlbum(collectionInfo);
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

  // rendersAlbumInfo = () => {
  //   const { albumInfo } = this.state;
  //   return (
  //     <>
  //       <p data-testid="artist-name">{albumInfo.artistName}</p>
  //       <img src={ albumInfo.artworkUrl100 } alt={ albumInfo.collectionName } />

  //       <p data-testid="album-name">{albumInfo.collectionName}</p>
  //     </>
  //   );
  // };

  // rendersMusics = () => {
  //   const { tracksInfo } = this.state;
  //   return tracksInfo.map((item) => (
  //     <MusicCard
  //       key={ item.trackId }
  //       { ...item }
  //       onCheckedHandler={ this.onCheckedHandler }
  //     />
  //   ));
  // };

  render() {
    const { albumInfo, tracksInfo, loading } = this.state;
    return (
      <>
        <Header />
        <h1>Album 🎵</h1>
        {loading && <Loading />}
        {!loading && (
          <div data-testid="page-album">
            <div className="collection-info">
              {albumInfo && (
                // this.rendersAlbumInfo()
                <>
                  <p data-testid="artist-name">{albumInfo.artistName}</p>
                  <img
                    src={ albumInfo.artworkUrl100 }
                    alt={ albumInfo.collectionName }
                  />

                  <p data-testid="album-name">{albumInfo.collectionName}</p>
                </>
              )}
            </div>
            <div className="musics">
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
        )}
      </>
    );
  }
}

Album.propTypes = {
  collectionId: propTypes.number.isRequired,
};

export default Album;
