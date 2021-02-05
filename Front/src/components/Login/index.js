import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Container, Form, Button, Alert, Spinner,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Title from '../PageTitle';

import './login.scss';

const Login = ({
  email,
  password,
  changeField,
  errorMessage,
  handleLogin,
  isLoading,
}) => {
  // Gestion de validation du formulaire (React Hook Form)
  const { register, handleSubmit, errors } = useForm();
  // Modification des champs
  const handleChange = (e) => changeField([e.target.name], e.target.value);

  return (
    <div className="background-image-login">
      <Title texte="Connectez-vous pour partager vos aventures !" />
      <Container className="d-flex justify-content-center align-items-center">
        <Form
          className="form-login"
          onSubmit={handleSubmit(handleLogin)}
        >
          {errorMessage && (
          <Alert variant="danger">{errorMessage}</Alert>)}
          <Form.Group size="lg" controlId="email">
            <Form.Label>Adresse email</Form.Label>
            <Form.Control
              autoFocus
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
              })}
            />
            {errors.password && <div className="text-danger">{errors.password.message}</div>}
          </Form.Group>
          {isLoading ? (
            <Button className="loading-spinner" disabled>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span className="sr-only">Loading...</span>
            </Button>
          ) : <Button block size="lg" className="mt-3 form-login-btn" type="submit">Valider</Button>}
          <p className="text-center m-3">Vous n'avez pas encore de compte ? <Link to="/inscription">Inscrivez-vous !</Link></p>
        </Form>
      </Container>
    </div>
  );
};

Login.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Login;
