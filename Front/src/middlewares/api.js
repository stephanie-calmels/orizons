import axios from 'axios';
import { loginSuccess, setMessage } from '../actions/auth';
import { getTripsSuccess, getCategoriesSuccess } from '../actions/trips';
import { LOGIN, RANDOM_SEARCH, GET_MORE_RESULTS, GET_TRIPS, GET_CATEGORIES } from '../actions/types';

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
          'email': email,
          'password': password,
        },
      };

      axios(config)
        .then((response) => {
          store.dispatch(loginSuccess(response.data));
          // eslint-disable-next-line no-console
          console.log('Je suis dans la réponse, et response.data vaut : ', response.data);
        })
        .catch((error) => {
          const resMessage = (error.response
            && error.response.data
            && error.response.data.message)
          || error.message
          || error.toString();
          store.dispatch(setMessage(resMessage));
        });
      break;
    };
    case RANDOM_SEARCH: {
      console.log('random search');
      break;
    };
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
          console.log(response.data.data);
          store.dispatch(getTripsSuccess(response.data.data));
        })
        .catch((error) => {
          console.error(error);
        });
      break;
    };
    case GET_MORE_RESULTS: {
      console.log('get more results');
      break;
    };
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
    };
    default:
      next(action);
  }
};

export default api;
