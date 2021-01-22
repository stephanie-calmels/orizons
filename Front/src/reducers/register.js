import {
  CHANGE_REGISTER_FIELD, REGISTER_SUCCESS,
} from '../actions/types';

const initialState = {
  nickname: '',
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  passwordRepeat: '',
  message: '',
  isSuccessful: false
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
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        passwordRepeat: '',
        message: action.message,
        isSuccessful: true,
      }
    default:
      return oldState;
  }
};

export default reducer;
