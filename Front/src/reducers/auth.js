import {
  CHANGE_AUTH_FIELD, LOGIN_SUCCESS, LOGOUT,
} from '../actions/types';

const initialState = {
  nickname: localStorage.getItem('nickname') || 'Anonyme',
  token: localStorage.getItem('token'),
  email: '',
  password: '',
  isLoggedIn: !!localStorage.getItem('token'),
  message: '',
  role: '',
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
      localStorage.setItem('token', action.token);
      localStorage.setItem('nickname', action.nickname);
      localStorage.setItem('role', action.role);
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
      !!localStorage.removeItem('token')
      return {
        ...oldState,
        nickname: '',
        token: '',
        email: '',
        password: '',
        isLoggedIn: !!localStorage.getItem('token'),
        message: '',
        role: '',
        isSuccessful: false,
      };
    default:
      return oldState;
  }
};

export default reducer;
