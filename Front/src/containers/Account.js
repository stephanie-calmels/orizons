import { connect } from 'react-redux';

import Account from 'src/components/Account';

import {
  changeRegisterField, activateLoader, getMember, updateMember, deleteMember
} from '../actions/member';

const mapStateToProps = (state) => ({
  nickname: state.member.nickname,
  lastname: state.member.lastname,
  firstname: state.member.firstname,
  email: state.member.email,
  password: state.member.password,
  passwordRepeat: state.member.passwordRepeat,
  errorMessage: state.member.errorMessage,
  isLoading: state.member.isLoading,
  registrationDate: state.member.registrationDate,
  profilePhoto: state.member.profilePhoto,
  id: state.member.id,
});
// cablage des actions
const mapDispatchToProps = (dispatch) => ({
  changeField: (name, value) => {
    dispatch(changeRegisterField(name, value));
  },
  handleUpdate: (data) => {
    dispatch(activateLoader());
    dispatch(updateMember(data));
  },
  handleDelete: () => {
    dispatch(deleteMember());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
