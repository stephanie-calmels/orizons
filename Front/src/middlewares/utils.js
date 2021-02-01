import { getRandomTripsSuccess, getTripsByCategoriesSuccess, getTripsByCountrySuccess } from '../actions/trips';

import history from '../history';

import {
  GET_RANDOM_TRIPS, GET_TRIPS_BY_CATEGORY, RANDOM_SEARCH, GET_TRIPS_BY_COUNTRY
} from '../actions/types';

const utils = (store) => (next) => (action) => {
  switch (action.type) {
    case GET_RANDOM_TRIPS: {
      const { trips: { trips } } = store.getState();
      let randomItems = [];
      for (let i = 0; i < 4; i++) {
        let item = trips[Math.floor(Math.random() * trips.length)];
        const found = randomItems.find(trip => trip.id === item.id);
        if (found) {
          i--;
        } else {
          randomItems.push(item);
        }
      }
      store.dispatch(getRandomTripsSuccess(randomItems));
      break;
    };
    case GET_TRIPS_BY_CATEGORY: {
      const { trips: { trips } } = store.getState();
      const results = []
      trips.forEach((trip) => {
        trip.categories.forEach((category) => {
          if (category.id === action.id) {
            results.push(trip);
          }
        });
      })
      store.dispatch(getTripsByCategoriesSuccess(results));
      break;
    }; 
    case RANDOM_SEARCH: {
      console.log('random search');
      const { trips: { trips } } = store.getState();
      const item = trips[Math.floor(Math.random() * trips.length)];
      history.push(`/exploration/${item.id}`);
      break;
    };
    case GET_TRIPS_BY_COUNTRY: {
      console.log('get trips by country : ' + action.code);
      const { trips: { trips } } = store.getState();
      const results = []
      trips.forEach((trip) => {
        trip.trip_localisation.forEach((country) => {
          if (country.code === action.code) {
            results.push(trip);
          }
        });
      })
      store.dispatch(getTripsByCountrySuccess(results));
      break;
    }; 
    default:
      next(action);
  }
};

export default utils;
