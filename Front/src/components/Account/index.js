import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Container, Card, ListGroup, ListGroupItem, Button, Modal, Nav,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import dayjs from 'dayjs';

import Title from '../PageTitle/index';
import RegisterForm from '../Register/RegisterForm';

import './account.scss';

dayjs.locale('fr');

const Account = ({
  firstname,
  lastname,
  nickname,
  email,
  password,
  passwordRepeat,
  isSuccessful,
  errorMessage,
  isLoading,
  changeField,
  handleRegister,
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

  return (
    <>
      <Title texte="Mon compte" />
      {isLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Chargement...</span>
      </Spinner>}
      <Container>
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

        {/* ================  Modal Modifier le compte ==================== */}
        <Modal size="xl" show={showUpdate} onHide={() => handleUpdateModal()}>
          <Modal.Header closeButton><h2>Modifier mes données personnelles</h2></Modal.Header>
          <Modal.Body>
            <RegisterForm
              nickname={nickname}
              lastname={lastname}
              firstname={firstname}
              email={email}
              password={password}
              passwordRepeat={passwordRepeat}
              isSuccessful={isSuccessful}
              errorMessage={errorMessage}
              isLoading={isLoading}
              changeField={changeField}
              handleRegister={handleRegister}
            />
          </Modal.Body>
        </Modal>

        {/* ================  Modal Supprimer le compte ==================== */}
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
  handleRegister: PropTypes.func.isRequired,
  loadMember: PropTypes.func.isRequired,
  registrationDate: PropTypes.string.isRequired,
  profilePhoto: PropTypes.string.isRequired,
};

export default Account;
