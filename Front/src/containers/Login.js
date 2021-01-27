import { connect } from 'react-redux';

import Login from 'src/components/Login';

import {
  changeAuthField, login, activateLoader,
} from '../actions/auth';

const mapStateToProps = (state) => ({
  email: state.auth.email,
  password: state.auth.password,
  isLoggedIn: state.auth.isLoggedIn,
  isLoginSuccessful: state.auth.isLoginSuccessful,
  errorMessage: state.auth.errorMessage,
  isLoading: state.auth.isLoading,
});

// cablage des actions
const mapDispatchToProps = (dispatch) => ({
  changeField: (name, value) => {
    dispatch(changeAuthField(name, value));
  },
  handleLogin: () => {
    dispatch(login());
    dispatch(activateLoader());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
