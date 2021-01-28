import { getRandomTripsSuccess, getTripsByCategoriesSuccess } from '../actions/trips';

import {
  GET_RANDOM_TRIPS, GET_TRIPS_BY_CATEGORY
} from '../actions/types';

const utils = (store) => (next) => (action) => {
  switch (action.type) {
    case GET_RANDOM_TRIPS: {
      const { trips: { allTrips } } = store.getState();
      let randomItems = [];
      for (let i = 0; i < 4; i++) {
        let item = allTrips[Math.floor(Math.random() * allTrips.length)];
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
      const { trips: { allTrips } } = store.getState();
      const results = []
      allTrips.forEach((trip) => {
        trip.categories.forEach((category) => {
          if (category.id === action.id) {
            results.push(trip);
          }
        });
      })
      store.dispatch(getTripsByCategoriesSuccess(results));
      break;
    }; 
    default:
      next(action);
  }
};

export default utils;
