import { connect } from 'react-redux';

import Register from 'src/components/Register';

import {
  changeRegisterField, register,
} from '../actions/register';

const mapStateToProps = (state) => ({
  nickname: state.register.nickname,
  lastname: state.register.lastname,
  firstname: state.register.firstname,
  email: state.register.email,
  password: state.register.password,
  passwordRepeat: state.register.passwordRepeat,
  isSuccessful: state.register.isSuccessful,
  message: state.register.message,
});
// cablage des actions
const mapDispatchToProps = (dispatch) => ({
  changeField: (name, value) => {
    dispatch(changeRegisterField(name, value));
  },
  handleRegister: () => {
    dispatch(register());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
