import { connect } from 'react-redux';

import Header from 'src/components/Header';
import {
  logout,
} from '../actions/auth';
import {
  changeSearchField, search
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
  changeSearchField: (value) => {
    dispatch(changeSearchField(value));
  },
  handleSearch: (value) => {
    dispatch(search(value));
    history.push(`/resultats`);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
