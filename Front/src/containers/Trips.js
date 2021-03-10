import { connect } from 'react-redux';
import Trips from 'src/components/Trips';
import history from '../history';

import { getMoreResults, getTrips, getCategories } from '../actions/trips';

const mapStateToProps = (state) => ({
  filteredTrips: state.trips.filteredTrips,
  categories: state.trips.categories,
});

const mapDispatchToProps = (dispatch) => ({
  loadTrips: () => {
    dispatch(getTrips());
  },
  loadCategories: () => {
    dispatch(getCategories());
  },
  handleClick: (id) => {
    history.push(`/exploration/${id}`);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Trips);
