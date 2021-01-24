import { connect } from 'react-redux';

import Account from 'src/components/Account';

import {
  changeRegisterField, update, activateLoader,
} from '../actions/register';

const mapStateToProps = (state) => ({
  nickname: state.register.nickname,
  last_name: state.register.last_name,
  first_name: state.register.first_name,
  email: state.register.email,
  password: state.register.password,
  passwordRepeat: state.register.passwordRepeat,
  isSuccessful: state.register.isSuccessful,
  errorMessage: state.register.errorMessage,
  isLoading: state.register.isLoading,
});
// cablage des actions
const mapDispatchToProps = (dispatch) => ({
  changeField: (name, value) => {
    dispatch(changeRegisterField(name, value));
  },
  handleRegister: () => {
    dispatch(update());
    dispatch(activateLoader());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
