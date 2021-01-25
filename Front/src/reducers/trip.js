import trips from 'src/data/trips';

const trip = trips[0];

const initialState = {
  trip: trip,
};

const reducer = (oldState = initialState, action) => {
  switch (action.type) {
    
    default:
      return oldState;
  }
};

export default reducer;
