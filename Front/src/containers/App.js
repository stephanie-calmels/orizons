import { connect } from 'react-redux';

import App from '../components/App';

import {
  getMember,
} from '../actions/member';

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
  loadMember: () => {
    dispatch(getMember());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
