import { connect } from 'react-redux';

import Login from 'src/components/Login';
import {
  changeAuthField, login,
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
  changeField: (name, value) => {
    dispatch(changeAuthField(name, value));
  },
  handleLogin: () => {
    dispatch(login());
  },
  setLoader: () => {
    dispatch(setLoader());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
