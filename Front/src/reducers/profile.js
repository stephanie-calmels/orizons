
import {GET_PROFILE_SUCCESS, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL} from '../actions/types';


const initialState = {
  profileInfos: null,
};

const reducer = (oldState = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_SUCCESS:
      return {
        ...oldState,
        profileInfos: action.profile,
      };
      case UPDATE_PROFILE_SUCCESS:
      return {
        ...oldState,
        profileInfos: action.profile,
      };
      case UPDATE_PROFILE_FAIL:
      return {
        ...oldState,
        errorMessage: action.message,
      };
    default:
      return oldState;
  }
};

export default reducer;
