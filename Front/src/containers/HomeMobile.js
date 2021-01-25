import { connect } from 'react-redux';

import HomeMobile from 'src/components/HomeMobile';

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  trips: state.trips.trips,
});

export default connect(mapStateToProps)(HomeMobile);
