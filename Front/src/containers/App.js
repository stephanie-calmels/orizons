import { connect } from 'react-redux';

import App from '../components/App';

import {
  getMember,
} from '../actions/member';
import {
  getTrips, getCategories,
} from '../actions/trips';
import { getCountries, } from '../actions/countries';

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  loadMember: () => {
    dispatch(getMember());
  },
  loadTrips: () => {
    dispatch(getTrips());
  },
  loadCategories: () => {
    dispatch(getCategories());
  },
  loadCountries: () => {
    dispatch(getCountries());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
