import React, { Component } from 'react';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      userName: 'Convidado',
      loading: false,
    };
    this.callsUser = this.callsUser.bind(this);
  }

  componentDidMount() {
    const { userName } = this.state;
    this.callsUser();
    console.log('cdm:', userName);
  }

  callsUser = async () => {
    this.setState({ loading: true });
    const newUser = await getUser().name;
    console.log('callsuser:', newUser);

    this.setState(() => ({ userName: newUser, loading: false }));
  };

  render() {
    const { loading, userName } = this.state;

    return (
      <div data-testid="header-component">
        {loading && <Loading />}
        <p data-testid="header-user-name">{userName}</p>
      </div>
    );
  }
}

Header.propTypes = {};

export default Header;
