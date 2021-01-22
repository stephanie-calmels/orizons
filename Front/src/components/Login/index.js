import React, { useEffect } from 'react';
import {
  Container, Form, Button, Alert,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import './login.scss';
import history from '../../history';

const Login = ({
  email,
  password,
  changeField,
  message,
  isSuccessful,
  handleLogin
}) => {

  // Gestion de validation du formulaire (React Hook Form)
  const { register, handleSubmit, errors } = useForm();
  // Modification des champs
  const handleChange = (e) => changeField([e.target.name], e.target.value);

  useEffect(()=> {
    if (isSuccessful) {
      toast.success("Bon retour parmi nous !");
      history.push('/ajouter-carnet');
    }
  }, [isSuccessful])

  return (
    <>
      <h1 className="text-center p-4 font-weight-bold">Connectez-vous pour partager vos aventures !</h1>
      <Container className="d-flex justify-content-center align-items-center">
        <Form
          className="form"
          onSubmit={handleSubmit(handleLogin)}
        >
          {/* {message && (
          <Alert
            className={isSuccessful ? 'alert alert-success' : 'alert alert-danger'}
          >
            {message}
          </Alert>
          )} */}
          <Form.Group size="lg" controlId="email">
            <Form.Label>Adresse email</Form.Label>
            <Form.Control
              autofocus
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
          <Button block size="lg" className="mt-3" type="submit">Valider</Button>
        </Form>
      </Container>
      <p className="text-center m-3">Vous n'avez pas encore de compte ? <Link to="/inscription">Inscrivez-vous !</Link></p>
    </>
  );
};

export default Login;
