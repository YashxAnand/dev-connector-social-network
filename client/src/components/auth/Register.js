import React, { Component } from "react";
import { registeruser } from "../../actions/authAction";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextFieldGroup from "../../common/TextFieldGroup";

class Register extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.registeruser(newUser, this.props.history);
  };

  componentDidMount() {
    if (this.props.auth.isAuthorized) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <div className='register'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 m-auto'>
                <h1 className='display-4 text-center'>Sign Up</h1>
                <p className='lead text-center'>
                  Create your DevConnector account
                </p>
                <form noValidate onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder='Name'
                    name='name'
                    value={this.state.name}
                    onChange={this.onChange}
                    errors={errors.name}
                  />
                  <TextFieldGroup
                    placeholder='Email'
                    name='email'
                    value={this.state.email}
                    onChange={this.onChange}
                    errors={errors.email}
                    info='This site uses Gravatar so if you want a profile image,
                    use a Gravatar email'
                  />
                  <TextFieldGroup
                    placeholder='Password'
                    name='password'
                    value={this.state.password}
                    onChange={this.onChange}
                    errors={errors.password}
                    type='password'
                  />
                  <TextFieldGroup
                    placeholder='Confirm Password'
                    name='password2'
                    value={this.state.password2}
                    onChange={this.onChange}
                    errors={errors.password2}
                    type='password'
                  />
                  <input
                    type='submit'
                    className='btn btn-info btn-block mt-4'
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registeruser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registeruser })(withRouter(Register));
