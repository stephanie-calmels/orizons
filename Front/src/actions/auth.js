import {
  CHANGE_AUTH_FIELD, LOGIN, LOGIN_SUCCESS, LOGOUT, LOGIN_FAIL,
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

export const loginFail = (message) => ({
  type: LOGIN_FAIL,
  message,
});
