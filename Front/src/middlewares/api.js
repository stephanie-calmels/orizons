import axios from 'axios';

import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';

import { getTripsSuccess, getCategoriesSuccess, getRandomTrips } from '../actions/trips';
import { loginSuccess, loginFail } from '../actions/auth';
import {
  registerSuccess, registerFail, getMemberSuccess, getMemberFail, updateMemberSuccess,
  updateMemberFail, deleteMemberSuccess, updateMemberProfilePhotoSuccess,
} from '../actions/member';

import { getProfileSuccess, updateProfileSuccess, updateProfileFail } from '../actions/profile';
import { postNewTripSuccess } from '../actions/addTrip';
import { postNewStepSuccess } from '../actions/addStep';
import { getCountriesSuccess } from '../actions/countries';
import { getTripSuccess, updateTripSuccess, updateStepSuccess, deleteStepSuccess
} from '../actions/trip';
import {
  LOGIN, REGISTER, GET_MEMBER, UPDATE_MEMBER, GET_MORE_RESULTS, GET_TRIP,
  GET_TRIPS, GET_CATEGORIES, GET_PROFILE, DELETE_MEMBER, UPDATE_PROFILE_PHOTO,
  UPDATE_PROFILE, POST_NEW_STEP, POST_NEW_TRIP, GET_COUNTRIES, UPDATE_TRIP, UPDATE_STEP,
  DELETE_TRIP, DELETE_STEP,
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
      localStorage.removeItem('token');
      toast.success('Suppression du compte confirmée');
      history.push('/');
      const { auth: { token }, member: { id } } = store.getState();
      const config = {
        method: 'delete',
        url: `https://orizons.herokuapp.com/members/${id}`,
        headers: {
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
          // console.log('réponse get_trip', response.data)
          store.dispatch(getTripSuccess(response.data.data[0]));
        })
        .catch((error) => {
          console.error(error);
          history.replace('/lost404')

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
          // console.log(response.data.data);
          store.dispatch(getProfileSuccess(response.data.data));
        })
        .catch((error) => {
          console.error(error);
          history.replace('/lost404')
        });
      break;
    };
    case POST_NEW_STEP:{
      const config = {
        method: 'post',
        url: `https://orizons.herokuapp.com/steps`,
        headers:{
          'Content-Type': 'application/json',
        },
        data:{
          title: action.data.title,
          content: action.data.summary,
          step_date: action.data.date,
          latitude: action.data.localisation[0],
          longitude: action.data.localisation[1],
          pictures: action.data.pictures,
          country_code: action.data.country_code,
          trip_id: action.data.trip_id 
        },
      };
      axios(config)
        .then((response)=>{
          // console.log(response.data);
          store.dispatch(postNewStepSuccess(response.data.data[0]));
        })
        .catch((error) =>{
          console.error(error);
        })
        break;
    }
    case POST_NEW_TRIP:{
      const { member: { id } } = store.getState();

      const config = {
        method: 'post',
        url: `https://orizons.herokuapp.com/trips`,
        headers:{
          'Content-Type': 'application/json',
        },
        data:{
          title: action.data.title,
          summary: action.data.summary,
          country_code: action.data.country_code,
          cover_picture: action.data.coverpicture,
          categories: action.data.categories,
          departure_date: action.data.departure,
          arrival_date: action.data.returndate,
          member_id: id 
        }
      };
      axios(config)
        .then((response)=>{
          const { id } = response.data.data;
          // console.log(response.data);
          store.dispatch(postNewTripSuccess(response.data.data));
          toast.success('Votre carnet a bien été créé !');
          history.push(`/exploration/${id}`);
        })
        .catch((error) =>{
          console.error(error);
        })
        break;
    }
    case GET_COUNTRIES:{
      const config = {
        method: 'get',
        url: `https://orizons.herokuapp.com/countries`,
        headers:{
          'Content-Type': 'application/json',
        },
      };  
      axios(config)
        .then((response) => {
          // console.log('countries', response.data.data.rows);
          store.dispatch(getCountriesSuccess(response.data.data.rows));
        })
        .catch((error) =>{
          console.error(error);
          toast.warning(errorMessage);
        })
        break;
    }
    case UPDATE_PROFILE_PHOTO: {
      const { auth: { token }, member: { id } } = store.getState();
      const config = {
        method: 'patch',
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
          toast.warning(errorMessage);
        });
      break;
    }
    case UPDATE_PROFILE: {
      const { auth: { token }, member: { id } } = store.getState();
      const config = {
        method: 'patch',
        url: `https://orizons.herokuapp.com/members/profile_infos/${id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: {
          biography: action.data.biography,
          localisation: action.data.localisation,
          coverpicture_url: action.data.cover
        },
      };
      axios(config)
        .then((response) => {
          // console.log(response.data);
          store.dispatch(updateProfileSuccess(response.data.data));
          toast.success('Modification des données réussie !');
          history.push(`/profil/${id}`);
        })
        .catch((error) => {
          const errorMessage = (error.response
        && error.response.data
        && error.response.data.message)
        || error.message
        || error.toString();
          store.dispatch(updateProfileFail(errorMessage));
          toast.warning(errorMessage);
        });
      break;
    }
    case UPDATE_TRIP: {
      const { auth: { token } } = store.getState();
      const { id } = store.getState().trip.tripItem.trip;
      console.log('id',id);
      const config = {
        method: 'patch',
        url: `https://orizons.herokuapp.com/trips/${id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: action.data,
      };
      axios(config)
        .then((response) => {
          // console.log('réponseArmandine',response.data);
          store.dispatch(updateTripSuccess(response.data.data[0])); //modif
          toast.success('Modification des données réussie !');
        })
        .catch((error) => {
          console.log(error);
          const errorMessage = (error.response
        && error.response.data
        && error.response.data.message)
        || error.message
        || error.toString();
          toast.warning(errorMessage);
        });
        break;
      }
    case DELETE_TRIP: {
      const { auth: { token } } = store.getState();
      const { id } = store.getState().trip.tripItem.trip;
      const config = {
        method: 'delete',
        url: `https://orizons.herokuapp.com/trips/${id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      axios(config)
        .then((response) => {
          // console.log(response.data);
          toast.success('Suppression du carnet réussie !');
          history.push(`/exploration`);
        })
        .catch((error) => {
          const errorMessage = (error.response
        && error.response.data
        && error.response.data.message)
        || error.message
        || error.toString();
          toast.warning(errorMessage);
        });
        break;
    }
    case UPDATE_STEP: {
      const { auth: { token } } = store.getState();
      const { id: tripId} = store.getState().trip.tripItem.trip;
      const config = {
        method: 'patch',
        url: `https://orizons.herokuapp.com/steps/${action.id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: {
          title: action.data.title,
          content: action.data.summary,
          step_date: action.data.date,
          latitude: action.data.localisation[0],
          longitude: action.data.localisation[1],
          pictures: action.data.pictures,
          country_code: action.data.country_code,
          trip_id: action.data.trip_id 
        }
      };
      axios(config)
        .then((response) => {
          // console.log('réponse updateStep',response.data);
          store.dispatch(updateStepSuccess(response.data.data[0])); //modif ici
          toast.success('Modification des données réussie !');
          // history.go(0);
        })
        .catch((error) => {
          const errorMessage = (error.response
        && error.response.data
        && error.response.data.message)
        || error.message
        || error.toString();
          toast.warning(errorMessage);
        });
        break;
    }
    case DELETE_STEP: {
      const { auth: { token } } = store.getState();
      const config = {
        method: 'delete',
        url: `https://orizons.herokuapp.com/steps/${action.id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: {
          trip_id:action.trip_id,
        }
      };
      console.log('monactiondelete',action)
      axios(config)
        .then((response) => {
          // console.log('réponse à la suppression étape',response.data)
          store.dispatch(deleteStepSuccess(response.data.data[0])); // TODO : a vérifier avec Armandine
          toast.success('Suppression de l\'étape réussie !');
          // history.go(0);
        })
        .catch((error) => {
          const errorMessage = (error.response
        && error.response.data
        && error.response.data.message)
        || error.message
        || error.toString();
          toast.warning(errorMessage);
        });
        break;
    }
    default:
      next(action);
  }
};

export default api;
