import React, { Component } from "react";
import { connect } from "react-redux";

class CreateProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displaySocialInput: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      linkedin: "",
      facebook: "",
      youtube: "",
      instagram: "",
      errors: {},
    };
  }

  render() {
    return (
      <div className='create-profile'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h1 className='display-4 text-center'>Create Your Profile</h1>
              <p className='lead text-center'>
                Let's get some information to make your profile standout
              </p>
              <small className='d-block pb-3'>* = required fields</small>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProfile = state => ({
  profile: state.profile,
});
export default connect(mapStateToProfile)(CreateProfile);
