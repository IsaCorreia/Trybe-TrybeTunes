import React from 'react';
import { Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import Album from './pages/Album';
import Login from './pages/Login';

class App extends React.Component {
  render() {
    return (
      <>
        <p>TrybeTunes</p>
        <BrowserRouter>
          {/* <Switch> */}
          <div data-testid="page-login">
            <Route exact path="/" component={ Login } />
          </div>

          <div data-testid="page-search">
            <Route path="/search" component={ Search } />
          </div>

          <div data-testid="page-album">
            <Route path="/album/:id" component={ Album } />
          </div>

          <div data-testid="page-favorites">
            <Route path="/favorites" component={ Favorites } />
          </div>

          <div data-testid="page-profile">
            <Route path="/profile" component={ Profile } />
          </div>

          <div data-testid="page-profile-edit">
            <Route path="/profile/edit" component={ ProfileEdit } />
          </div>

          <div data-testid="page-not-found">
            <Route path="*" component={ NotFound } />
          </div>
          {/* </Switch> */}
        </BrowserRouter>
      </>
    );
  }
}

export default App;
