import React from 'react';
import PropTypes from 'prop-types';

import Title from '../PageTitle';
import RegisterForm from './RegisterForm';

import './register.scss';

const Register = (props) => (
  <div className="background-image-register">
    <Title texte="Inscrivez-vous pour créer votre premier carnet !" />
    <RegisterForm
      {...props}
    />
  </div>
);

Register.propTypes = {
  nickname: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  passwordRepeat: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  handleRegister: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Register;
