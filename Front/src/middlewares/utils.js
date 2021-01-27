import { getRandomTripsSuccess } from '../actions/trips';

import {
  GET_RANDOM_TRIPS,
} from '../actions/types';

const utils = (store) => (next) => (action) => {
  switch (action.type) {
    case GET_RANDOM_TRIPS: {
      const { trips: { trips } } = store.getState();
      let randomItems = [];
      for (let i = 0; i < 4; i++) {
        let item = trips[Math.floor(Math.random() * trips.length)];
        randomItems.push(item);
      }
      store.dispatch(getRandomTripsSuccess(randomItems));
      break;
    }
      
    default:
      next(action);
  }
};

export default utils;
