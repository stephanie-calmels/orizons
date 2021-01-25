import { connect } from 'react-redux';

import Trips from 'src/components/Trips';
import { getMoreResults } from '../actions/trips';

const mapStateToProps = (state) => ({
  trips: state.trips.trips,
  categories: state.trips.categories
});

const mapDispatchToProps = (dispatch) => ({
  showMoreResults: () => {
    dispatch(getMoreResults());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Trips);
