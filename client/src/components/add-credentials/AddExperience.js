import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../../common/TextFieldGroup";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import { addExperience } from "../../actions/profileAction";
import PropTypes from "prop-types";

class AddExperience extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      company: "",
      location: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disabled: false,
    };
    this.onCheck = this.onCheck.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onCheck(e) {
    this.setState({ current: !this.state.current });
    this.setState({ disabled: !this.state.disabled });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const expData = {
      title: this.state.title,
      company: this.state.company,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description,
      errors: this.state.errors,
    };

    this.props.addExperience(expData, this.props.history);
    console.log(expData);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className='add-experience'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <Link to='/dashboard' className='btn btn-light'>
                Go Back
              </Link>
              <h1 className='display-4 text-center'>Add Experience</h1>
              <p className='lead text-center'>
                Add any job or position that you have had in past or current
              </p>
              <small className='d-block pb-3'>* = required</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name='title'
                  placeholder='* Job Title'
                  value={this.state.title}
                  onChange={this.onChange}
                  errors={errors.title}
                />
                <TextFieldGroup
                  name='company'
                  placeholder='* Company'
                  value={this.state.company}
                  onChange={this.onChange}
                  errors={errors.company}
                />
                <TextFieldGroup
                  name='location'
                  placeholder='Location'
                  value={this.state.location}
                  onChange={this.onChange}
                  errors={errors.location}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  name='from'
                  type='date'
                  value={this.state.from}
                  onChange={this.onChange}
                  errors={errors.from}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  name='to'
                  type='date'
                  value={this.state.to}
                  onChange={this.onChange}
                  disabled={this.state.disabled ? "disabled" : ""}
                  errors={errors.to}
                />
                <div className='form-check mb-4'>
                  <input
                    type='checkbox'
                    name='current'
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.onCheck}
                    className='form-check-input'
                  />
                  <label htmlFor='current' className='form-check-label'>
                    Current Job
                  </label>
                </div>
                <TextAreaFieldGroup
                  name='description'
                  type='text'
                  placeholder='Job Description'
                  value={this.state.description}
                  onChange={this.onChange}
                  errors={errors.description}
                />
                <input
                  type='submit'
                  className='submit btn btn-info btn-block mt-4'
                  value='Submit'
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
});
export default connect(mapStateToProps, { addExperience })(
  withRouter(AddExperience)
);
