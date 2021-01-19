import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

import './subscribe.scss';

const Subscribe = () => {
  const [nickname, setNickname] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("ceci est un envoi de formulaire");
  }

  return (
    <>
      <h1 className="text-center">Inscris-toi pour créer ton premier carnet !</h1>
      <Container className="d-flex justify-content-center align-items-center">
        <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="nickname">
            <Form.Label>Pseudonyme</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="lastname">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="firstname">
            <Form.Label>Prénom</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Adresse email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="password">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="passwordConfirmation">
            <Form.Label>Confirmation du mot de passe</Form.Label>
            <Form.Control
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </Form.Group>
          <Button block size="lg" type="submit">
            Valider
          </Button>
        </Form>
      </Container>
    </>
  )
  };

export default Subscribe;
