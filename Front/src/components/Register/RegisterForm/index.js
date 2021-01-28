import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Container, Form, Button, Alert, Spinner,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import './registerForm.scss';

// import history from '../../../history';

const Register = ({
  nickname,
  lastname,
  firstname,
  email,
  password,
  passwordRepeat,
  changeField,
  errorMessage,
  isRegisterSuccessful,
  handleRegister,
  isLoading,
}) => {
  // Hook qui vient de React Hook Form
  const { register, handleSubmit, errors } = useForm({});
  // Modification des champs
  const handleChange = (e) => changeField([e.target.name], e.target.value);

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Form
        className="form"
        onSubmit={handleSubmit(handleRegister)}
      >
        {errorMessage && (
          <Alert variant="danger">{errorMessage}</Alert>)}
        <Form.Group size="lg" controlId="nickname">
          <Form.Label>Pseudonyme</Form.Label>
          <Form.Control
            autoFocus
            name="nickname"
            type="text"
            defaultValue={nickname}
            onChange={(e) => handleChange(e)}
              // on attache notre input au React Hook Form pour les critères de validation
            ref={register({
              // si le champ n'est pas rempli lors de la soumission, le champ se met en focus
              required: 'Veuillez remplir ce champ !',
            })}
          />
          {errors.nickname && <div className="text-danger mb-2">{errors.nickname.message}</div>}
        </Form.Group>
        <Form.Group size="lg" controlId="lastname">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            name="lastname"
            type="text"
            defaultValue={lastname}
            onChange={(e) => handleChange(e)}
            ref={register({
              required: 'Veuillez remplir ce champ !',
            })}
          />
          {errors.lastname && <div className="text-danger">{errors.lastname.message}</div>}
        </Form.Group>
        <Form.Group size="lg" controlId="first_name">
          <Form.Label>Prénom</Form.Label>
          <Form.Control
            name="firstname"
            type="text"
            defaultValue={firstname}
            onChange={(e) => handleChange(e)}
            ref={register({
              required: 'Veuillez remplir ce champ !',
            })}
          />
          {errors.firstname && <div className="text-danger">{errors.firstname.message}</div>}
        </Form.Group>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Adresse email</Form.Label>
          <Form.Control
            name="email"
            type="email"
            defaultValue={email}
            onChange={(e) => handleChange(e)}
            ref={register({
              required: 'Veuillez remplir ce champ !',
            })}
          />
          {errors.email && <div className="text-danger">{errors.email.message}</div>}
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            name="password"
            type="password"
            defaultValue={password}
            onChange={(e) => handleChange(e)}
            ref={register({
              required: 'Veuillez remplir ce champ !',
              minLength: {
                value: 8,
                message: 'Ce champ doit contenir au moins 8 caractères',
              },
              validate: (value) => (
                [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every((pattern) => pattern.test(value)) || 'Ce champ doit contenir au moins une majuscule, une minuscule et un caractère spécial'
              ),
            })}
          />
          {errors.password && <div className="text-danger">{errors.password.message}</div>}
        </Form.Group>
        <Form.Group size="lg" controlId="password-repeat">
          <Form.Label>Confirmation du mot de passe</Form.Label>
          <Form.Control
            name="passwordRepeat"
            type="password"
            defaultValue={passwordRepeat}
            onChange={(e) => handleChange(e)}
            ref={register({
              required: 'Veuillez remplir ce champ !',
              validate: (value) => value === password || 'Veuillez entrer le même mot de passe',
            })}
          />
          {errors.passwordRepeat && <div className="text-danger">{errors.passwordRepeat.message}</div>}
        </Form.Group>
        {isLoading ? (
          <Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span className="sr-only">Loading...</span>
          </Button>
        ) : <Button block size="lg" className="mt-3" type="submit">Valider</Button>}
      </Form>
    </Container>
  );
};

Register.propTypes = {
  nickname: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  passwordRepeat: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  isRegisterSuccessful: PropTypes.bool.isRequired,
  handleRegister: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Register;
