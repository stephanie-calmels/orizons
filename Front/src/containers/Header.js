import { connect } from 'react-redux';

import Header from 'src/components/Header';
import {
  logout,
} from '../actions/auth';

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  nickname: state.auth.nickname,
});

const mapDispatchToProps = (dispatch) => ({
  handleLogout: () => {
    dispatch(logout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
