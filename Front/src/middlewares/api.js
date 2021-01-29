import axios from 'axios';

import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';

import { getTripsSuccess, getCategoriesSuccess, getRandomTrips } from '../actions/trips';
import { loginSuccess, loginFail } from '../actions/auth';
import {
  registerSuccess, registerFail, getMemberSuccess, getMemberFail, updateMemberSuccess,
  updateMemberFail, deleteMemberFail, deleteMemberSuccess, updateMemberProfilePhotoSuccess,
  updateMemberProfilePhotoFail,
} from '../actions/member';
import { getProfileSuccess } from '../actions/profile';
import { getTripSuccess } from '../actions/trip';
import {
  LOGIN, REGISTER, GET_MEMBER, UPDATE_MEMBER, GET_MORE_RESULTS, GET_TRIP,
  GET_TRIPS, GET_CATEGORIES, GET_PROFILE, DELETE_MEMBER, UPDATE_PROFILE_PHOTO,
} from '../actions/types';

import history from '../history';

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
          toast.success('Connexion réussie !');
          history.replace('/ajouter-carnet');
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
          // console.log(response.data.data)
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
          toast.success('Inscription réussie !');
          history.replace('/connexion');
        })
        .catch((error) => {
          const errorMessage = (error.response
          && error.response.data
          && error.response.data.message)
          || error.message
          || error.toString();
          store.dispatch(registerFail(errorMessage));
          toast.warning(errorMessage);
        });
      break;
    }
    case UPDATE_MEMBER: {
      // On récupère le token après le login
      const { auth: { token }, member: { id } } = store.getState();
      const config = {
        method: 'patch',
        url: `https://orizons.herokuapp.com/members/${id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: {
          nickname: action.data.nickname,
          first_name: action.data.firstname,
          last_name: action.data.lastname,
          email: action.data.email,
        },
      };
      axios(config)
        .then((response) => {
          store.dispatch(updateMemberSuccess(response.data.data));
          toast.success('Modification des données réussie !');
        })
        .catch((error) => {
          const errorMessage = (error.response
        && error.response.data
        && error.response.data.message)
        || error.message
        || error.toString();
          store.dispatch(updateMemberFail(errorMessage));
          toast.warning(errorMessage);
        });
      break;
    }
    case DELETE_MEMBER: {
      const { auth: { token }, member: { id } } = store.getState();
      const config = {
        method: 'delete',
        url: `https://orizons.herokuapp.com/members/${id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      axios(config)
        .then((response) => {
          store.dispatch(deleteMemberSuccess(response.data.message));
        })
        .catch((error) => {
          const errorMessage = (error.response
        && error.response.data
        && error.response.data.message)
        || error.message
        || error.toString();
          console.log(errorMessage);
          store.dispatch(deleteMemberFail(errorMessage));
        });
      break;
    }
    case GET_TRIP: {
      const config = {
        method: 'get',
        url: `https://orizons.herokuapp.com/trips/${action.id}`,
        headers: {
          'Content-Type': 'application/json',
        },
      };
      axios(config)
        .then((response) => {
          store.dispatch(getTripSuccess(response.data.data[0]));
        })
        .catch((error) => {
          console.error(error);
        });
      break;
    }
    case GET_TRIPS: {
      const config = {
        method: 'get',
        url: 'https://orizons.herokuapp.com/trips',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      axios(config)
        .then((response) => {
          store.dispatch(getTripsSuccess(response.data.data));
          store.dispatch(getRandomTrips());
        })
        .catch((error) => {
          console.error(error);
        });
      break;
    }
    case GET_MORE_RESULTS: {
      console.log('get more results');
      break;
    }
    case GET_CATEGORIES: {
      const config = {
        method: 'get',
        url: 'https://orizons.herokuapp.com/categories',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      axios(config)
        .then((response) => {
          store.dispatch(getCategoriesSuccess(response.data.data));
        })
        .catch((error) => {
          console.error(error);
        });
      break;
    }
    case GET_PROFILE: {
      const config = {
        method: 'get',
        url: `https://orizons.herokuapp.com/members/${action.id}`,
        headers: {
          'Content-Type': 'application/json',
        },
      };
      axios(config)
        .then((response) => {
          console.log(response.data.data);
          store.dispatch(getProfileSuccess(response.data.data[0]));
        })
        .catch((error) => {
          console.error(error);
        });
      break;
    }
    case UPDATE_PROFILE_PHOTO: {
      const { auth: { token }, member: { id } } = store.getState();
      const config = {
        method: 'post',
        url: `https://orizons.herokuapp.com/members/profile_photo/${id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: {
          url: action.url,
        },
      };
      axios(config)
        .then((response) => {
          // eslint-disable-next-line no-console
          // console.log(response.data.data);
          store.dispatch(updateMemberProfilePhotoSuccess(response.data.data));
          toast.success('Modification prise en compte !');
        })
        .catch((error) => {
          const errorMessage = (error.response
      && error.response.data
      && error.response.data.message)
      || error.message
      || error.toString();
          // eslint-disable-next-line no-console
          console.log(errorMessage);
          store.dispatch(updateMemberProfilePhotoFail(errorMessage));
          toast.warning(errorMessage);
        });
      break;
    }
    default:
      next(action);
  }
};

export default api;
