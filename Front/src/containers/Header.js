import { connect } from 'react-redux';

import Header from 'src/components/Header';
import {
  logout,
} from '../actions/auth';
import {
  changeSearchField
} from '../actions/trips';
import history from '../history';

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  nickname: state.member.nickname,
  profilePhoto: state.member.profilePhoto,
  id: state.member.id,
  search: state.trips.search
});

const mapDispatchToProps = (dispatch) => ({
  handleLogout: () => {
    dispatch(logout());
    localStorage.removeItem('token');
    history.push('/');
  },
  changeSearchField:  (value) => {
    dispatch(changeSearchField(value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
