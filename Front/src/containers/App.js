import { connect } from 'react-redux';

import App from '../components/App';

import {
  getMember,
} from '../actions/member';
import {
  getTrips,
} from '../actions/trips';

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
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
