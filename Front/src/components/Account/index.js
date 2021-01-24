import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Container, Card, ListGroup, ListGroupItem, Button, Modal,
} from 'react-bootstrap';

import Title from '../PageTitle/index';
import RegisterForm from '../Register/RegisterForm';

const Account = ({ 
    first_name,
    last_name,
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
  },[])


  return (
    <>
      <Title texte="Mon compte" />
      <Container>
          <Card>
            <Card.Img style={{ maxWidth: '300px', height:'300px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxrm42nsUpuTWs0XsEqedLlgReL51sG7Ljsw&usqp=CAU" />
            <Card.Body>
              <Card.Title>Paramètres du compte</Card.Title>
              <Card.Text>
                Membre depuis le
              </Card.Text>
              <ListGroup className="list-group-flush">
                <ListGroupItem className="d-flex justify-content-between align-items-center">
                  <div>Nom : <span className="font-weight-bold">{last_name}</span></div>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between align-items-center">
                  <div>Prénom : <span className="font-weight-bold">{first_name}</span></div>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between align-items-center">
                  <div>Pseudonyme : <p>www.orizons.com/<span className="font-weight-bold">{nickname.toLowerCase()}</span></p></div>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between align-items-center">
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

        <Modal size='xl' show={showUpdate} onHide={() => handleUpdateModal()}>
          <Modal.Header closeButton><h2>Modifier mes données personnelles</h2></Modal.Header>
          <Modal.Body>
            <RegisterForm
              nickname={nickname}
              lastname={last_name}
              firstname={first_name}
              email={email}
              nickname={nickname}
              password={password}
              passwordRepeat={passwordRepeat}
              isSuccessful={isSuccessful}
              errorMessage={errorMessage}
              isLoading={isLoading}
              changeField={changeField}
              handleRegister={handleRegister}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => {
              console.log('va envoyer les infos au serveur');
            }}
            >
              Modifier
              </Button>
          </Modal.Footer>
        </Modal>
        <Modal size='md' show={showDelete} onHide={() => handleDeleteModal()}>
          <Modal.Header closeButton><h2>Supprimer mon compte</h2></Modal.Header>
          <Modal.Body>
            <h3 className="text-danger text-center">⚠ Attention !</h3>
            <p> En cliquant sur le bouton « Confirmer », vous allez supprimer votre compte avec vos carnets de voyages et toutes vos photos.
                Cette suppression est définitive, nous ne pourrons pas récupérer vos données ultérieurement.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => {
              console.log('va envoyer les infos au serveur');
            }}
            >
              Supprimer
                    </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default Account;
