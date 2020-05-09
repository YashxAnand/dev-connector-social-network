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
              <Switch>
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
                <PrivateRoute
                  exact
                  path='/create-profile'
                  component={CreateProfile}
                />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
