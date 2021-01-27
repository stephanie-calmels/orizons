import { connect } from 'react-redux';

import Register from 'src/components/Register';

import {
  changeRegisterField, register, activateLoader,
} from '../actions/member';

const mapStateToProps = (state) => ({
  nickname: state.member.nickname,
  lastname: state.member.lastname,
  firstname: state.member.firstname,
  email: state.member.email,
  password: state.member.password,
  passwordRepeat: state.member.passwordRepeat,
  isRegisterSuccessful: state.member.isRegisterSuccessful,
  errorMessage: state.member.errorMessage,
  isLoading: state.member.isLoading,
});
// cablage des actions
const mapDispatchToProps = (dispatch) => ({
  changeField: (name, value) => {
    dispatch(changeRegisterField(name, value));
  },
  handleRegister: () => {
    dispatch(register());
    dispatch(activateLoader());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
