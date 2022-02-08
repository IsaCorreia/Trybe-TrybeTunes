import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Header from '../components/Header';

class Profile extends Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header />
        <h1>Profile 👤</h1>
      </div>
    );
  }
}

// Profile.propTypes = {

// };

export default Profile;
