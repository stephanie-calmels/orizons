import {
  CHANGE_AUTH_FIELD, LOGIN_SUCCESS, LOGOUT, LOGIN_FAIL,
} from '../actions/types';

const initialState = {
  nickname: localStorage.getItem('nickname') || '',
  token: localStorage.getItem('token') || '',
  email: '',
  password: '',
  isLoggedIn: !!localStorage.getItem('token'),
  errorMessage: '',
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
        isLoggedIn: action.isLogged,
        isSuccessful: true,
      };
    case LOGOUT:
      window.location.replace('/');// refresh pour vider tout l'historique du state
      return oldState;
    case LOGIN_FAIL:
      return {
        ...oldState,
        errorMessage: action.message,
      };
    default:
      return oldState;
  }
};

export default reducer;
