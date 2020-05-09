import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserProfile } from "../../actions/profileAction";
import Spinner from "../../common/spinner";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getUserProfile();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardContent = <h1>TODO: DISPLAY PROFILE CONTENT</h1>;
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

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { getUserProfile })(Dashboard);
