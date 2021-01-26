import trips from 'src/data/trips';


const initialState = {
  tripItem: trips[1],
};

const reducer = (oldState = initialState, action) => {
  switch (action.type) {
    
    default:
      return oldState;
  }
};

export default reducer;
