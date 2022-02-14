import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends Component {
  state = {
    loading: false,
    userInfo: {},
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const userInfo = await getUser();
    this.setState({ userInfo }, () => this.setState({ loading: false }));
  }

  render() {
    const { loading, userInfo } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <h1>Profile 👤</h1>
        {loading && <Loading />}

        <img
          data-testid="profile-image"
          src={ userInfo && userInfo.image }
          alt={ userInfo && userInfo.name }
        />
        <p>{userInfo && userInfo.name}</p>
        <p>{userInfo && userInfo.email}</p>
        <p>{userInfo && userInfo.description}</p>

        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
  }
}

// Profile.propTypes = {

// };

export default Profile;
