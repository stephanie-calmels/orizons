import axios from 'axios';
import { loginSuccess, loginFail } from '../actions/auth';
import {
  registerSuccess, registerFail, getMemberSuccess, getMemberFail,
} from '../actions/member';
import { LOGIN, REGISTER, GET_MEMBER } from '../actions/types';

const api = (store) => (next) => (action) => {
  switch (action.type) {
    case LOGIN: {
      const { auth: { email, password } } = store.getState();
      const config = {
        method: 'post',
        url: 'https://orizons.herokuapp.com/members/login',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          email,
          password,
        },
      };

      axios(config)
        .then((response) => {
          const {
            token, nickname, role, id,
          } = response.data;
          store.dispatch(loginSuccess(response.data));
          localStorage.setItem('token', token);
          localStorage.setItem('nickname', nickname);
          localStorage.setItem('role', role);
          localStorage.setItem('id', id);
        })
        .catch((error) => {
          const errorMessage = (error.response
            && error.response.data
            && error.response.data.message)
          || error.message
          || error.toString();
          store.dispatch(loginFail(errorMessage));
        });
      break;
    }
    case REGISTER: {
      const {
        member: {
          nickname, firstname, lastname, email, password,
        },
      } = store.getState();
      const config = {
        method: 'post',
        url: 'https://orizons.herokuapp.com/members',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          nickname,
          first_name: firstname,
          last_name: lastname,
          email,
          password,
        },
      };
      axios(config)
        .then((response) => {
          store.dispatch(registerSuccess(response.data.message));
        })
        .catch((error) => {
          const errorMessage = (error.response
          && error.response.data
          && error.response.data.message)
          || error.message
          || error.toString();
          store.dispatch(registerFail(errorMessage));
        });
      break;
    }
    case GET_MEMBER: {
      const config = {
        method: 'get',
        url: 'https://orizons.herokuapp.com/members/39',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer ${token}'
        },
        // TODO: AJOUT DU TOKEN AUTHENTIFICATION
      };
      axios(config)
        .then((response) => {
          store.dispatch(getMemberSuccess(response.data.data));
        })
        .catch((error) => {
          const errorMessage = (error.response
        && error.response.data
        && error.response.data.message)
        || error.message
        || error.toString();
          store.dispatch(getMemberFail(errorMessage));
        });
    }
      break;
    default:
      next(action);
  }
};

export default api;
