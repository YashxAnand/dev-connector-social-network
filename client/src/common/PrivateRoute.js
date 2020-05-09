import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        auth.isAuthorized === true ? (
          <Component {...props} />
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProp = state => ({
  auth: state.auth,
});
export default connect(mapStateToProp)(PrivateRoute);
