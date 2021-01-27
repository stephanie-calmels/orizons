import {
  CHANGE_AUTH_FIELD, LOGIN_SUCCESS, LOGOUT, LOGIN_FAIL,
  SET_LOADER_LOGIN,
} from '../actions/types';

const initialState = {
  // on va chercher dans le localStorage = PERSISTANCE même après fermeture de la page
  token: localStorage.getItem('token') || null,
  isLoggedIn: !!localStorage.getItem('token'),
  email: '',
  password: '',
  errorMessage: '',
  isSuccessful: false,
  isLoading: false,
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
        token: action.member.token,
        isLoggedIn: true,
        isSuccessful: true,
        isLoading: false,
      };
    case LOGOUT:
      window.location.replace('/');// refresh pour vider tout l'historique du state
      return oldState;
    case LOGIN_FAIL:
      return {
        ...oldState,
        errorMessage: action.message,
        isLoading: false,
      };
    case SET_LOADER_LOGIN:
      return {
        ...oldState,
        isLoading: true,
      };
    default:
      return oldState;
  }
};

export default reducer;
