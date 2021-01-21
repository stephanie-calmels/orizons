import {
  CHANGE_EMAIL_FIELD, CHANGE_PASSWORD_FIELD, LOGIN, LOGIN_SUCCESS, LOGOUT, SET_MESSAGE,
} from './types';

export const changeEmail = (value) => ({
  type: CHANGE_EMAIL_FIELD,
  value,
});

export const changePassword = (value) => ({
  type: CHANGE_PASSWORD_FIELD,
  value,
});

export const login = () => ({
  type: LOGIN,
});

export const loginSuccess = (isLogged, nickname, role, token) => ({
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
