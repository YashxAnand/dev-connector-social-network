import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import PrivateRoute from "./common/PrivateRoute";
import Login from "./components/auth/Login";
import { setCurrentUser, logoutuser } from "./actions/authAction";
import Dashboard from "./components/dashboard/Dashboard";
import { clearCurrentProfile } from "./actions/profileAction";
import CreateProfile from "./components/create-profile/CreateProfile";
import setAuthToken from "./utils/setAuthToken";
import Register from "./components/auth/Register";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import NotFound from "./components/not-found/NotFound";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";

class App extends Component {
  render() {
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
      const decoded = jwt_decode(localStorage.jwtToken);
      store.dispatch(setCurrentUser(decoded));

      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        store.dispatch(logoutuser());
        store.dispatch(clearCurrentProfile());
        window.location.href = "/login";
      }
    }
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <Navbar />
            <Route exact path='/' component={Landing} />
            <div className='container'>
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/profiles' component={Profiles} />
              <Route exact path='/profile/:handle' component={Profile} />
              <Switch>
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path='/create-profile'
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path='/edit-profile'
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path='/add-experience'
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path='/add-education'
                  component={AddEducation}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path='/post/:id' component={Post} />
              </Switch>
              <Switch>
                <PrivateRoute exact path='/feed' component={Posts} />
              </Switch>
              <Route exact path='/not-found' component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
