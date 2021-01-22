import {
  CHANGE_AUTH_FIELD, LOGIN_SUCCESS, LOGOUT, REGISTER_SUCCESS,
} from '../actions/types';

const initialState = {
  nickname:localStorage.getItem('nickname') || '',
  token: localStorage.getItem('token') || '',
  email: '',
  password: '',
  isLoggedIn: !!localStorage.getItem('token'),
  message: '',
  role: localStorage.getItem('role') || '',
  isSuccessful: false,
};

const reducer = (oldState = initialState, action) => {
  switch (action.type) {
    case CHANGE_AUTH_FIELD:
      return {
        ...oldState,
        [action.name]: action.value,
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
      };
    case LOGOUT:
      return {
        ...oldState,
        nickname: '',
        token: '',
        email: '',
        password: '',
        isLoggedIn: false,
        message: '',
        role: '',
        isSuccessful: false,
      };
    case REGISTER_SUCCESS:
      return {
        ...oldState,
        isLoggedIn: false,
      }
    default:
      return oldState;
  }
};

export default reducer;
