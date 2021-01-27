import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Container, Card, ListGroup, ListGroupItem, Button, Modal, Nav,
  Form, Alert, Spinner,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useForm } from 'react-hook-form';

import dayjs from 'dayjs';

import Title from '../PageTitle/index';

import './account.scss';

dayjs.locale('fr');

const Account = ({
  firstname,
  lastname,
  nickname,
  email,
  password,
  passwordRepeat,
  errorMessage,
  isLoading,
  handleUpdate,
  loadMember,
  registrationDate,
  profilePhoto,
  id,

}) => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  
  const handleUpdateModal = () => {
    setShowUpdate(!showUpdate);
  };
  const handleDeleteModal = () => {
    setShowDelete(!showDelete);
  };

  useEffect(() => {
    // lors du chargement du composant Account, on charge les données du membre connecté
    loadMember();
  }, []);

  // Hook qui vient de React Hook Form
  const { register, handleSubmit, errors } = useForm({});
  // Modification des champs
  // const handleChange = (e) => changeField([e.target.name], e.target.value);

  const [values, setValues] = useState({
    nickname: nickname,
    lastname: lastname,
    firstname: firstname,
    email: email,
    password: password,
    passwordRepeat: passwordRepeat,
  })

  const handleInputChange = e => {
    const {name, value} = e.target
    setValues({...values, [name]: value})
  }

  return (
    <>
      <Title texte="Mon compte" />
      {isLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Chargement...</span>
      </Spinner>}
      <Container>
      {/* ==================== CARD ========================================= */}
        <Card className="card-account">
          <Card.Img className="card-account__img" src={profilePhoto} />
          <LinkContainer to={`/profil/${id}`} className="card-account__link">
            <Nav.Link>Consulter mon profil</Nav.Link>
          </LinkContainer>
          <Card.Body>
            <Card.Title className="card-account__title">Paramètres du compte</Card.Title>
            <Card.Text className="card-account__text">
              Membre depuis le <span className="font-weight-bold">{dayjs(`${registrationDate}`).format('DD/MM/YYYY')}</span>
            </Card.Text>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                <div>Nom : <span className="font-weight-bold">{lastname}</span></div>
              </ListGroupItem>
              <ListGroupItem>
                <div>Prénom : <span className="font-weight-bold">{firstname}</span></div>
              </ListGroupItem>
              <ListGroupItem>
                <div>Pseudonyme : <p>www.orizons.com/<span className="font-weight-bold">{nickname.toLowerCase()}</span></p></div>
              </ListGroupItem>
              <ListGroupItem>
                <div>Adresse email : <span className="font-weight-bold">{email}</span></div>
              </ListGroupItem>
            </ListGroup>
          </Card.Body>
        </Card>
         {/* ==================== BUTTONS ========================================= */}
        <div className="text-center">
          <Button
            className="m-2"
            onClick={() => {
              handleUpdateModal();
            }}
            variant="primary"
          >Modifier mes données{' '}
            <i className="far fa-edit" />
          </Button>
          <Button
            className="m-2"
            onClick={() => {
              handleDeleteModal();
            }}
            variant="danger"
          >Supprimer mon compte{' '}
            <i className="fas fa-trash" />
          </Button>
        </div>

        {/* ================  MODAL Modifier le compte ==================== */}
        <Modal size="xl" show={showUpdate} onHide={() => handleUpdateModal()}>
          <Modal.Header closeButton><h2>Modifier mes données personnelles</h2></Modal.Header>
          <Modal.Body>
          <Form
        className="form"
        onSubmit={handleSubmit(handleUpdate)}
          >
        {errorMessage && (
          <Alert variant="danger">{errorMessage}</Alert>)}
        <Form.Group size="lg" controlId="nickname">
          <Form.Label>Pseudonyme</Form.Label>
          <Form.Control
            autoFocus
            name="nickname"
            type="text"
            defaultValue={values.nickname}
            onChange={(e) => handleInputChange(e)}
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
            defaultValue={values.lastname}
            onChange={(e) => handleInputChange(e)}
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
            defaultValue={values.firstname}
            onChange={(e) => handleInputChange(e)}
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
            defaultValue={values.email}
            onChange={(e) => handleInputChange(e)}
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
            defaultValue={values.password}
            onChange={(e) => handleInputChange(e)}
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
            defaultValue={values.passwordRepeat}
            onChange={(e) => handleInputChange(e)}
            ref={register({
              required: 'Veuillez remplir ce champ !',
              // validate: (value) => value === password || 'Veuillez entrer le même mot de passe',
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
        ) : <Button
                size="lg"
                className="mt-3"
                type="submit"
            >
            Valider
            </Button>}
      </Form>
          </Modal.Body>
        </Modal>

        {/* ================  MODAL Supprimer le compte ==================== */}
        <Modal size="md" show={showDelete} onHide={() => handleDeleteModal()}>
          <Modal.Header closeButton><h2>Supprimer mon compte</h2></Modal.Header>
          <Modal.Body>
            <h3 className="text-danger text-center">⚠ Attention !</h3>
            <p> En cliquant sur le bouton « Confirmer », vous allez supprimer votre compte
              avec vos carnets de voyages et toutes vos photos. Cette suppression est définitive,
              nous ne pourrons pas récupérer vos données ultérieurement.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => {
              // eslint-disable-next-line no-console
                console.log('va envoyer les infos au serveur');
                handleDeleteModal();
              }}
              variant="danger"
            >
              Supprimer
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

Account.propTypes = {
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  nickname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  passwordRepeat: PropTypes.string.isRequired,
  isSuccessful: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  changeField: PropTypes.func.isRequired,
  loadMember: PropTypes.func.isRequired,
  registrationDate: PropTypes.string.isRequired,
  profilePhoto: PropTypes.string.isRequired,
};

export default Account;
