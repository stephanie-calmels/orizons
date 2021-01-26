import axios from 'axios';
import { loginSuccess, setMessage } from '../actions/auth';
import { LOGIN } from '../actions/types';
import { RANDOM_SEARCH, GET_TRIP } from '../actions/types';

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
    case GET_TRIP:{
      const config = {
        method: 'get',
        url: `https://orizons.herokuapp.com/trip/${action.id}`,
        headers: {
          'Content-Type': 'application/json',
        },
      };
      axios(config)
        .then((response) => {
          console.log(response.data.data);
          store.dispatch(getTripSuccess(response.data.data));
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
