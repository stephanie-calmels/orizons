import { connect } from 'react-redux';

import Header from 'src/components/Header';
import {
  logout,
} from '../actions/auth';

import history from '../history';

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  nickname: state.member.nickname,
  profilePhoto: state.member.profilePhoto,
  id: state.member.id,
});

const mapDispatchToProps = (dispatch) => ({
  handleLogout: () => {
    dispatch(logout());
    localStorage.removeItem('token');
    history.push('/');
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
