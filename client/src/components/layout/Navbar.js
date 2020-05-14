import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutuser } from "../../actions/authAction";
import { clearCurrentProfile } from "../../actions/profileAction";

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutuser();
    this.props.clearCurrentProfile();
  };

  render() {
    const { isAuthorized, user } = this.props.auth;

    const authUser = (
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item'>
          <Link className='nav-link' to='/feed'>
            Post Feed
          </Link>
        </li>
        <li>
          <Link className='nav-link' to='/dashboard'>
            Dashboard
          </Link>
        </li>
        <li className='nav-item'>
          <a href='' className='nav-link' onClick={this.onLogoutClick}>
            <img
              src={user.avatar}
              alt={user.name}
              style={{ width: "25px", borderRadius: "25px" }}
            />{" "}
            Logout
          </a>
        </li>
      </ul>
    );

    const guestUser = (
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item'>
          <Link className='nav-link' to='/register'>
            Sign Up
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/login'>
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <div>
        <nav className='navbar navbar-expand-sm navbar-dark bg-dark mb-4'>
          <div className='container'>
            <Link className='navbar-brand' to='/'>
              DevConnector
            </Link>
            <button
              className='navbar-toggler'
              type='button'
              data-toggle='collapse'
              data-target='#mobile-nav'
            >
              <span className='navbar-toggler-icon'></span>
            </button>

            <div className='collapse navbar-collapse' id='mobile-nav'>
              <ul className='navbar-nav mr-auto'>
                <li className='nav-item'>
                  <Link className='nav-link' to='/profiles'>
                    {" "}
                    Developers
                  </Link>
                </li>
              </ul>
              {isAuthorized ? authUser : guestUser}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToUser = state => ({
  auth: state.auth,
});

export default connect(mapStateToUser, { logoutuser, clearCurrentProfile })(
  Navbar
);
