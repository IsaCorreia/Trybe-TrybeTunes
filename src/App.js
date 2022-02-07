import React from 'react';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      isButtonDisabled: true,
    };

    this.onNameInputChange = this.onNameInputChange.bind(this);
  }

  onNameInputChange = (event) => {
    const { value } = event.target;
    const MIN_STRING_LENGTH = 3;
    const buttonState = !(value.length >= MIN_STRING_LENGTH || false);
    this.setState({ isButtonDisabled: buttonState });
  };

  render() {
    return (
      <>
        <p>TrybeTunes</p>
        <BrowserRouter>
          {/* <Switch> */}
          <Route
            exact
            path="/"
            render={ () => (
              <Login { ...this.state } onNameInputChange={ this.onNameInputChange } />
            ) }
          />

          <Route path="/search" component={ Search } />

          <Route path="/album/:id" component={ Album } />

          <Route path="/favorites" component={ Favorites } />

          <Route path="/profile" component={ Profile } />

          <Route path="/profile/edit" component={ ProfileEdit } />

          <Route path="*" component={ NotFound } />
          {/* </Switch> */}
        </BrowserRouter>
      </>
    );
  }
}

export default App;
