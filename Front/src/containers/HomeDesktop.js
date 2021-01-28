import { connect } from 'react-redux';
import history from '../history';

import HomeDesktop from 'src/components/HomeDesktop';
import {
  randomSearch, getCategories,
} from '../actions/trips';

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  randomTrips: state.trips.randomTrips,
  categories: state.trips.categories,
});

const mapDispatchToProps = (dispatch) => ({
  randomSearch: () => {
    dispatch(randomSearch());
  },
  handleClick: (id) => {
    history.push(`/exploration/${id}`);
  },
  loadCategories: () => {
    dispatch(getCategories());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeDesktop);
