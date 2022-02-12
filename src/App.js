import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  BrowserRouter,
  Switch,
} from 'react-router-dom/cjs/react-router-dom.min';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Loading from './pages/Loading';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import { createUser } from './services/userAPI';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      isButtonDisabled: true,
      loading: false,
      redirect: false,
    };
  }

  onNameInputChange = (event) => {
    const { value } = event.target;
    const MIN_STRING_LENGTH = 3;
    const buttonState = !(value.length >= MIN_STRING_LENGTH || false);
    this.setState({
      isButtonDisabled: buttonState,
      userName: value,
    });
  };

  onButtonClick = async () => {
    const { userName } = this.state;
    this.setState({ loading: true });
    const newUser = await createUser({ name: userName });

    this.setState(
      () => ({ userName: newUser, loading: false }),
      () => { this.setState({ redirect: true }); },
    );
  };

  renderRedirect = () => <Redirect to="/search" />;

  render() {
    const { loading, redirect, userName } = this.state;

    return (
      <BrowserRouter>
        { loading && <Loading />}
        { redirect && this.renderRedirect() }
        <Switch>
          <Route
            exact
            path="/"
            render={ () => (
              <Login
                { ...this.state }
                onNameInputChange={ this.onNameInputChange }
                onButtonClick={ this.onButtonClick }
              />
            ) }
          />

          <Route path="/search" component={ () => <Search userName={ userName } /> } />

          <Route path="/album/:id" component={ Album } />

          <Route path="/favorites" component={ Favorites } />

          <Route path="/profile/edit" component={ ProfileEdit } />

          <Route path="/profile" component={ Profile } />

          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
