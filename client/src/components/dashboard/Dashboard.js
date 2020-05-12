import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserProfile, deleteCurrentUser } from "../../actions/profileAction";
import Spinner from "../../common/spinner";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ProfileAction from "./ProfileAction";
import Experience from "./Experience";
import Education from "./Education";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getUserProfile();
  }

  deleteOnClick() {
    this.props.deleteCurrentUser();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className='lead text-muted'>
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileAction />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div style={{ marginBottom: "60px" }}></div>
            <button
              onClick={this.deleteOnClick.bind(this)}
              className='btn btn-danger'
            >
              Delete My Account
            </button>
          </div>
        );
      } else {
        dashboardContent = (
          <div>
            <p className='lead text-muted'>Welcome {user.name}</p>
            <p>You have not setup a profile yet, please add some info</p>
            <Link to='/create-profile' className='btn btn-lg btn-info'>
              Create Profile
            </Link>
          </div>
        );
      }
    }
    return (
      <div className='dashboard'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <h1>Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getUserProfile: PropTypes.func.isRequired,
  deleteCurrentUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { getUserProfile, deleteCurrentUser })(
  Dashboard
);
