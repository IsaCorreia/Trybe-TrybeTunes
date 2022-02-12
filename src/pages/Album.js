import React, { Component } from 'react';
import Header from '../components/Header';
// import getMusics from '../services/musicsAPI';

class Album extends Component {
  // getsAlbum = async () => {
  //   const { collectionId } = this.props;
  //   const musics = await getMusics(collectionId);
  //   musics
  //     .filter((item) => item.wrapperType === 'collection')
  //     .map((item) => this.setState({ albumInfo: item }));
  // };

  // componentDidMount() {
  //   this.getsAlbum();
  // }

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
//   collectionId: propTypes.number.isRequired,
// };

export default Album;
