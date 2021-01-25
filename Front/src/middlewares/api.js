import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { loginSuccess, loginFail } from '../actions/auth';
import {
  registerSuccess, registerFail, getMemberSuccess, getMemberFail, updateMemberSuccess,
  updateMemberFail,
} from '../actions/member';
import {
  LOGIN, REGISTER, GET_MEMBER, UPDATE_MEMBER,
} from '../actions/types';

const api = (store) => (next) => (action) => {
  switch (action.type) {
    case LOGIN: {
      // on récupère les champs depuis le store
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
          // on récupère le token du serveur et on le stocke dans le state
          const { token } = response.data;
          store.dispatch(loginSuccess(response.data));
          // on le stocke aussi dans le localStorage
          localStorage.setItem('token', token);
        })
        .catch((error) => {
          const errorMessage = (error.response
            && error.response.data
            && error.response.data.message)
          || error.message
          || error.toString();
          // en cas d'erreur on renvoie le message pour l'afficher
          store.dispatch(loginFail(errorMessage));
        });
      break;
    }
    case GET_MEMBER: {
      // On récupère le token après le login
      const { auth: { token } } = store.getState();
      // on extrait l'id du payload du token
      // pour pouvoir récupérer les infos du membre
      const id = jwtDecode(token).memberId;
      const config = {
        method: 'get',
        url: `https://orizons.herokuapp.com/members/${id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      axios(config)
        .then((response) => {
          // on met à jour le state du membre avec ses infos
          store.dispatch(getMemberSuccess(response.data.data));
        })
        .catch((error) => {
          const errorMessage = (error.response
        && error.response.data
        && error.response.data.message)
        || error.message
        || error.toString();
          // sinon on renvoie un message d'erreur
          store.dispatch(getMemberFail(errorMessage));
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
    case UPDATE_MEMBER: {
      const config = {
        method: 'patch',
        url: 'https://orizons.herokuapp.com/members/39',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer ${token}'
        },
      };
      axios(config)
        .then((response) => {
          store.dispatch(updateMemberSuccess(response.data.data));
        })
        .catch((error) => {
          const errorMessage = (error.response
        && error.response.data
        && error.response.data.message)
        || error.message
        || error.toString();
          store.dispatch(updateMemberFail(errorMessage));
        });
      break;
    }

    default:
      next(action);
  }
};

export default api;
