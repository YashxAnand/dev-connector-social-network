import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

//Registration of user
export const registeruser = (data, history) => dispatch => {
  axios
    .post("/api/users/register", data)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//Login user
export const loginuser = data => dispatch => {
  axios
    .post("api/users/login", data)
    .then(res => {
      const { token } = res.data;

      //Storting the token
      localStorage.setItem("jwtToken", token);

      //Set Auth header with token
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

//define setCurrentUser function
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

//Logout user
export const logoutuser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
