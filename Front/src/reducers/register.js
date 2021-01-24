import {
  CHANGE_REGISTER_FIELD, REGISTER_SUCCESS, REGISTER_FAIL,
  SET_LOADER_REGISTER,
} from '../actions/types';

const initialState = {
  nickname: '',
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  passwordRepeat: '',
  errorMessage: '',
  isSuccessful: false,
  isLoading: false,
};

const reducer = (oldState = initialState, action) => {
  switch (action.type) {
    case CHANGE_REGISTER_FIELD:
      return {
        ...oldState,
        [action.name]: action.value,
      };
    case REGISTER_SUCCESS:
      return {
        ...oldState,
        nickname: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        passwordRepeat: '',
        isSuccessful: true,
        isLoading: false,
      };
    case REGISTER_FAIL:
      return {
        ...oldState,
        errorMessage: action.message,
        isLoading: false,
      };
    case SET_LOADER_REGISTER:
      return {
        ...oldState,
        isLoading: true,
      }
    default:
      return oldState;
  }
};

export default reducer;
