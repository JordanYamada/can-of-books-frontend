import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import Profile from './About.js';
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

// withAuth0 for `class` components
import { withAuth0 } from '@auth0/auth0-react';

import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import ProfileAuth from '.Profile.';


class App extends React.Component {
 

  render() {
    return (
      <>
        {/* Routes in Navbar for our BooksCarousel and About page */}
        <Router>
          <Header />
          <Routes>
            <Route
              exact path="/"
              element={<BestBooks />}
            >
            </Route>
            <Route
              path="/about"
              element={<Profile />}
            >
            </Route>
          </Routes>
          <Footer />
        </Router>

      </>
    )
  }
}

// export the withauth0 and pass in the App class
export default withAuth0(App);
