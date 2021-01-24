import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Container, Form, Button, Alert, Spinner,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Title from '../PageTitle';

import './login.scss';
import history from '../../history';

const Login = ({
  email,
  password,
  changeField,
  errorMessage,
  isSuccessful,
  handleLogin,
  isLoading,
}) => {
  // Gestion de validation du formulaire (React Hook Form)
  const { register, handleSubmit, errors } = useForm();
  // Modification des champs
  const handleChange = (e) => changeField([e.target.name], e.target.value);

  useEffect(() => {
    if (isSuccessful) {
      toast.success('Connexion réussie !');
      history.replace('/ajouter-carnet');
    }
  }, [isSuccessful]);

  return (
    <>
      <Title texte="Connectez-vous pour partager vos aventures !"></Title>
      <Container className="d-flex justify-content-center align-items-center">
        <Form
          className="form"
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
                minLength: {
                  value: 8,
                  message: 'Le champ doit contenir au moins 8 caractères',
                },
                validate: (value) => (
                  [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].every((pattern) => pattern.test(value)) || 'Le champ doit contenir au moins une majuscule, minuscule et un caractère spécial'
                ),
              })}
            />
            {errors.password && <div className="text-danger">{errors.password.message}</div>}
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
      <p className="text-center m-3">Vous n'avez pas encore de compte ? <Link to="/inscription">Inscrivez-vous !</Link></p>
    </>
  );
};

Login.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  isSuccessful: PropTypes.bool.isRequired,
  handleLogin: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Login;
