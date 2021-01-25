import { connect } from 'react-redux';

import HomeDesktop from 'src/components/HomeDesktop';
import {
  randomSearch,
} from '../actions/trips';

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  trips: state.trips.trips,
  categories: state.trips.categories,
});

const mapDispatchToProps = (dispatch) => ({
  randomSearch: () => {
    dispatch(randomSearch());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeDesktop);
