import React, { Component } from "react";
import { connect } from "react-redux";
import TextFieldGroup from "../../common/TextFieldGroup";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import InputGroup from "../../common/InputGroup";
import SelectListGroup from "../../common/SelectListGroup";
import { createProfile } from "../../actions/profileAction";
import { withRouter } from "react-router-dom";

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.createProfile(
      {
        handle: this.state.handle,
        company: this.state.company,
        website: this.state.website,
        location: this.state.location,
        status: this.state.status,
        skills: this.state.skills,
        githubusername: this.state.githubusername,
        bio: this.state.bio,
        twitter: this.state.twitter,
        linkedin: this.state.linkedin,
        facebook: this.state.facebook,
        youtube: this.state.youtube,
        instagram: this.state.instagram,
      },
      this.props.history
    );
  };

  render() {
    const { errors, displaySocialInput } = this.state;

    const socialInputs = (
      <div className='mt-4'>
        <InputGroup
          placeholder='Twitter Profile URL'
          name='twitter'
          icon='fab fa-twitter'
          value={this.state.twitter}
          onChange={this.onChange}
          errors={errors.twitter}
        />
        <InputGroup
          placeholder='Facebook Page URL'
          name='facebook'
          icon='fab fa-facebook'
          value={this.state.facebook}
          onChange={this.onChange}
          errors={errors.facebook}
        />
        <InputGroup
          placeholder='Linkedin Profile URL'
          name='linkedin'
          icon='fab fa-linkedin'
          value={this.state.linkedin}
          onChange={this.onChange}
          errors={errors.linkedin}
        />
        <InputGroup
          placeholder='Youtube Channel URL'
          name='youtube'
          icon='fab fa-youtube'
          value={this.state.youtube}
          onChange={this.onChange}
          errors={errors.youtube}
        />
        <InputGroup
          placeholder='Instagram Page URL'
          name='instagram'
          icon='fab fa-instagram'
          value={this.state.instagram}
          onChange={this.onChange}
          errors={errors.instagram}
        />
      </div>
    );

    const options = [
      { label: "* Select Professional status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Junior Developer", value: "Junior Developer" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student or Teacher", value: "Student or Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" },
    ];

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
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder='* Profile Handle'
                  name='handle'
                  value={this.state.handle}
                  onChange={this.onChange}
                  errors={errors.handle}
                  info='A unique handle for your profile URL. Your full name, company name, nickname'
                />
                <SelectListGroup
                  placeholder='status'
                  name='status'
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  errors={errors.status}
                  info='Give us an idea of where you are in your career'
                />
                <TextFieldGroup
                  placeholder='Company'
                  name='company'
                  value={this.state.company}
                  onChange={this.onChange}
                  errors={errors.company}
                  info='Could be your own company or one you work for'
                />
                <TextFieldGroup
                  placeholder='Website'
                  name='website'
                  value={this.state.website}
                  onChange={this.onChange}
                  errors={errors.website}
                  info='Could be your own or company website'
                />
                <TextFieldGroup
                  placeholder='Location'
                  name='location'
                  value={this.state.location}
                  onChange={this.onChange}
                  errors={errors.location}
                  info='City & State suggested(e.g. Mumbai, Maharastra)'
                />
                <TextFieldGroup
                  placeholder='* Skills'
                  name='skills'
                  value={this.state.skills}
                  onChange={this.onChange}
                  errors={errors.skills}
                  info='Please use commna seperated values (e.g. HTML, CSS, Javascript)'
                />
                <TextFieldGroup
                  placeholder='Github Username'
                  name='githubusername'
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  errors={errors.githubusername}
                  info='If you want your latest repos and a github link, include you username'
                />
                <TextAreaFieldGroup
                  placeholder='Short Bio'
                  name='bio'
                  value={this.state.bio}
                  onChange={this.onChange}
                  errors={errors.bio}
                  info='Tell us a little about yourself'
                />
                <div className='mb-3'>
                  <button
                    type='button'
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInput: !prevState.displaySocialInput,
                      }));
                    }}
                    className='btn btn-light'
                  >
                    Add Social Network links
                  </button>
                  <span> Optional</span>
                  {displaySocialInput && socialInputs}
                  <input
                    type='submit'
                    value='submit'
                    className='btn btn-info btn-block mt-4'
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProfile = state => ({
  profile: state.profile,
  errors: state.errors,
});
export default connect(mapStateToProfile, { createProfile })(
  withRouter(CreateProfile)
);
