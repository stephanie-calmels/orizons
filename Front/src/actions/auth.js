import {
  CHANGE_AUTH_FIELD, LOGIN, LOGIN_SUCCESS, LOGOUT, LOGIN_FAIL,
  SET_LOADER_LOGIN,
} from './types';

export const changeAuthField = (name, value) => ({
  type: CHANGE_AUTH_FIELD,
  name,
  value,
});

export const login = () => ({
  type: LOGIN,
});

export const loginSuccess = (member) => ({
  type: LOGIN_SUCCESS,
  member
});

export const logout = () => ({
  type: LOGOUT,
});

export const loginFail = (message) => ({
  type: LOGIN_FAIL,
  message,
});

export const activateLoader = () => ({
  type: SET_LOADER_LOGIN,
});
