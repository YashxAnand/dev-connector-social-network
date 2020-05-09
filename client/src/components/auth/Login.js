import React, { Component } from "react";
import { loginuser } from "../../actions/authAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../../common/TextFieldGroup";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { auth, history } = this.props;

    if (auth.isAuthorized) {
      history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthorized) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const userToLogin = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginuser(userToLogin, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <div className='login'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 m-auto'>
                <h1 className='display-4 text-center'>Log In</h1>
                <p className='lead text-center'>
                  Sign in to your DevConnector account
                </p>
                <form noValidate onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    name='email'
                    placeholder='Email Address'
                    errors={errors.email}
                    type='email'
                    onChange={this.onChange}
                  />
                  <TextFieldGroup
                    name='password'
                    placeholder='Password'
                    errors={errors.password}
                    type='password'
                    onChange={this.onChange}
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

Login.propTypes = {
  loginuser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginuser })(Login);
