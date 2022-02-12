import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    this.callsUser();
  }

  callsUser = async () => {
    this.setState({ loading: true });
    const { name } = await getUser();
    this.setState({ userName: name, loading: false });
    this.forceUpdate();
  };

  render() {
    const { loading, userName } = this.state;

    return (
      <div data-testid="header-component">
        {loading && <Loading />}
        {!loading && (
          <>
            <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
            <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
            <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
            <p data-testid="header-user-name">
              Olá,
              {userName}
            </p>
          </>
        )}
      </div>
    );
  }
}

export default Header;
