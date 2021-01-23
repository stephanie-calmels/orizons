import { connect } from 'react-redux';

import Login from 'src/components/Login';

import {
  changeAuthField, login,
} from '../actions/auth';

const mapStateToProps = (state) => ({
  email: state.auth.email,
  password: state.auth.password,
  isLoggedIn: state.auth.isLoggedIn,
  isSuccessful: state.auth.isSuccessful,
  errorMessage: state.auth.errorMessage,
});

// cablage des actions
const mapDispatchToProps = (dispatch) => ({
  changeField: (name, value) => {
    dispatch(changeAuthField(name, value));
  },
  handleLogin: () => {
    dispatch(login());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
