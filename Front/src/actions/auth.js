import {
  CHANGE_AUTH_FIELD, LOGIN, LOGIN_SUCCESS, LOGOUT, SET_MESSAGE,
} from './types';

export const changeAuthField = (name, value) => ({
  type: CHANGE_AUTH_FIELD,
  name,
  value,
});

export const login = () => ({
  type: LOGIN,
});

export const loginSuccess = ({
  isLogged, nickname, role, token,
}) => ({
  type: LOGIN_SUCCESS,
  isLogged,
  nickname,
  role,
  token,
});

export const logout = () => ({
  type: LOGOUT,
});

export const setMessage = (message) => ({
  type: SET_MESSAGE,
  payload: message,
});
