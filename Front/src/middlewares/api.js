import axios from 'axios';
import { loginSuccess, setMessage } from '../actions/auth';
import { LOGIN } from '../actions/types';

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
    }
    default:
      next(action);
  }
};

export default api;
