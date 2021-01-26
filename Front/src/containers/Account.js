import { connect } from 'react-redux';

import Account from 'src/components/Account';

import {
  changeRegisterField, activateLoader, getMember, updateMember,
} from '../actions/member';

const mapStateToProps = (state) => ({
  nickname: state.member.nickname,
  lastname: state.member.lastname,
  firstname: state.member.firstname,
  email: state.member.email,
  password: state.member.password,
  passwordRepeat: state.member.passwordRepeat,
  isSuccessful: state.member.isSuccessful,
  errorMessage: state.member.errorMessage,
  isLoading: state.member.isLoading,
  registrationDate: state.member.registrationDate,
  profilePhoto: state.member.profilePhoto,
});
// cablage des actions
const mapDispatchToProps = (dispatch) => ({
  changeField: (name, value) => {
    dispatch(changeRegisterField(name, value));
  },
  handleRegister: () => {
    dispatch(activateLoader());
    dispatch(updateMember());
  },
  loadMember: () => {
    dispatch(getMember());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);