import { connect } from 'react-redux';

import history from '../history';

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
    localStorage.removeItem('token');
    localStorage.removeItem('nickname');
    localStorage.removeItem('role');
    history.push('/');
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
