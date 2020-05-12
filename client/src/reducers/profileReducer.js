import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ALL_PROFILES,
} from "../actions/types";

const initialState = {
  profile: null,
  profiles: null,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };

    case GET_ALL_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false,
      };

    case PROFILE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null,
      };
    default:
      return state;
  }
};
