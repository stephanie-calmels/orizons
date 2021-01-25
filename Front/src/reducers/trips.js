import trips from 'src/data/trips';
import categories from 'src/data/categories';

const initialState = {
  trips,
  categories,
};

const reducer = (oldState = initialState, action) => {
  switch (action.type) {
    default:
      return oldState;
  }
};

export default reducer;
