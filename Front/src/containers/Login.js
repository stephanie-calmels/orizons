import { connect } from 'react-redux';

import Login from 'src/components/Login';
import {
  changeEmail, changePassword, login, logout,
} from '../actions/auth';

const mapStateToProps = (state) => ({
  email: state.auth.email,
  password: state.auth.password,
  isLoggedIn: state.auth.isLoggedIn,
  isLoading: state.auth.isLoading,
  isSuccessful: state.auth.isSuccessful,
  message: state.auth.message,
});

// cablage des actions
const mapDispatchToProps = (dispatch) => ({
  changeEmailField: (value) => {
    dispatch(changeEmail(value));
  },
  changePasswordField: (value) => {
    dispatch(changePassword(value));
  },
  handleLogin: () => {
    dispatch(login());
  },
  handleLogout: () => {
    dispatch(logout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
