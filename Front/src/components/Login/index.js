import React, { useState } from 'react';
import {
  Container, Form, Button, Alert,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import './login.scss';

const Login = () => {
  const { register, handleSubmit, errors } = useForm();
  const [submitting, setSubmitting] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [serverError, setServerError] = useState(false);

  return (
    <>
      <h1 className="text-center p-4 font-weight-bold">Bon retour parmi nous !</h1>
      <Container className="d-flex justify-content-center align-items-center">
        <Form
          className="form"
          onSubmit={handleSubmit((formData) => {
          // on récupère un objet avec toutes les données. Envoyées seulement si correctes
            // on l'envoie au server
            setSubmitting(true);
            setServerError(false);
            const config = {
              method: 'post',
              // test avec le serveur de 'Recipes'
              url: 'http://localhost:3001/login',
              headers: {
                'Content-Type': 'application/json',
              },
              data: {
                email: formData.email,
                password: formData.password,
              },
            };

            axios(config) // on lance la requête
              .then((response) => {
                // en cas de succès on doit récupérer les infos (nickname, webtoken, isLogged)
                // eslint-disable-next-line no-console
                console.log('success', response.data);
              }).catch((error) => {
                // eslint-disable-next-line no-console
                console.error('error', error);
                setServerError('problème d\'identifiants');
              }).finally(() => {
                setSubmitting(false);
              });
          })}
        >
          {serverError && <Alert variant="danger">Adresse email ou mot de passe invalide !</Alert>}
          <Form.Group size="lg" controlId="email">
            <Form.Label>Adresse email</Form.Label>
            <Form.Control
              autoFocus
              name="email"
              type="email"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
              ref={register({
                required: 'Veuillez remplir ce champ !',
              })}
            />
            {errors.email && <div className="text-danger">{errors.email.message}</div>}
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              autoFocus
              name="password"
              type="password"
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
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

          {/* A la soumission du form, en attente de la réponse serveur le bouton est désactivé */}
          <Button block size="lg" className="mt-3" type="submit" disabled={submitting}>
            Valider
          </Button>
        </Form>
      </Container>
      <p className="text-center m-3">Vous n'avez pas encore de compte ? <Link to="/inscription">Inscrivez-vous !</Link></p>
    </>
  );
};

export default Login;
