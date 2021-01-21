import {
  CHANGE_PASSWORD_FIELD, CHANGE_EMAIL_FIELD, LOGIN_SUCCESS,
} from '../actions/types';

const initialState = {
  nickname: '',
  token: '',
  email: '',
  password: '',
  isLoggedIn: false,
  isLoading: false,
  message: '',
  role: '',
  isSuccessful: false,
};

const reducer = (oldState = initialState, action) => {
  switch (action.type) {
    case CHANGE_EMAIL_FIELD:
      return {
        ...oldState,
        email: action.value,
      };
    case CHANGE_PASSWORD_FIELD:
      return {
        ...oldState,
        password: action.value,
      };
    case LOGIN_SUCCESS:
      return {
        ...oldState,
        role: action.role,
        token: action.token,
        nickname: action.nickname,
        message: `Connexion réussie ${action.nickname} !`,
        isLoggedIn: action.isLogged,
        isSuccessful: true,
      }
    default:
      return oldState;
  }
};

export default reducer;
