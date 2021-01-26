import { connect } from 'react-redux';
import history from '../history';

import HomeMobile from 'src/components/HomeMobile';

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  trips: state.trips.trips,
});

const mapDispatchToProps = (dispatch) => ({
  handleClick: (id) => {
    history.push(`/exploration/${id}`);
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(HomeMobile);
