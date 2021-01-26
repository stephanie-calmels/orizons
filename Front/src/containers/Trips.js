import { connect } from 'react-redux';
import history from '../history';

import Trips from 'src/components/Trips';
import { getMoreResults, getTrips, getCategories } from '../actions/trips';

const mapStateToProps = (state) => ({
  trips: state.trips.trips,
  categories: state.trips.categories
});

const mapDispatchToProps = (dispatch) => ({
  showMoreResults: () => {
    dispatch(getMoreResults());
  },
  loadTrips: () => {
    dispatch(getTrips());
  },
  loadCategories: () => {
    dispatch(getCategories());
  },
  handleClick: (id) => {
    history.push(`/exploration/${id}`);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Trips);
