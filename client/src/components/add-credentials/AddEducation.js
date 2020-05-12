import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../../common/TextFieldGroup";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import { addEducation } from "../../actions/profileAction";
import PropTypes from "prop-types";

class AddEducation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      school: "",
      degree: "",
      fieldofstudy: "",
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
    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description,
      errors: this.state.errors,
    };

    this.props.addEducation(eduData, this.props.history);
  }

  render() {
    const { errors } = this.state;
    console.log(errors);

    return (
      <div className='add-education'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <Link to='/dashboard' className='btn btn-light'>
                Go Back
              </Link>
              <h1 className='display-4 text-center'>Add Education</h1>
              <p className='lead text-center'>
                Add any school, college, bootcamp etc that you have attended
              </p>
              <small className='d-block pb-3'>* = required</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name='school'
                  placeholder='* School Name'
                  value={this.state.school}
                  onChange={this.onChange}
                  errors={errors.school}
                />
                <TextFieldGroup
                  name='degree'
                  placeholder='* Degree'
                  value={this.state.degree}
                  onChange={this.onChange}
                  errors={errors.degree}
                />
                <TextFieldGroup
                  name='fieldofstudy'
                  placeholder='* Field of Study'
                  value={this.state.fieldofstudy}
                  onChange={this.onChange}
                  errors={errors.fieldofstudy}
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
                    Current Education
                  </label>
                </div>
                <TextAreaFieldGroup
                  name='description'
                  type='text'
                  placeholder='Program Description'
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
});
export default connect(mapStateToProps, { addEducation })(
  withRouter(AddEducation)
);
