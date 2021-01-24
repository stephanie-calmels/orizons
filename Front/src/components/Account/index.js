import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Container, Card, ListGroup, ListGroupItem, Button, Modal, ButtonGroup,
} from 'react-bootstrap';

import Title from '../PageTitle/index';
import RegisterForm from '../Register/RegisterForm';

const Account = ({
  nickname,
  email,
  firstname,
  lastname,
  registration_date,
}) => {
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const handleUpdateModal = () => {
    setShowUpdate(!showUpdate);
  };
  const handleDeleteModal = () => {
    setShowDelete(!showDelete);
  };

  return (
    <>
      <Title texte="Mon compte" />
      <Container>
        <div>
          <Card style={{ width: '25em' }} className="flex-row">
            <Card.Img style={{ width: '400px', height:'400px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxrm42nsUpuTWs0XsEqedLlgReL51sG7Ljsw&usqp=CAU" />
            <Card.Body>
              <Card.Title>Paramètres de connexion</Card.Title>
              <Card.Text>
                <p>Membre depuis le {registration_date}</p>
              </Card.Text>
              <ListGroup className="list-group-flush">
                <ListGroupItem className="d-flex justify-content-between align-items-center">
                  <div>Nom : <span className="font-weight-bold">{`${lastname}`}</span></div>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between align-items-center">
                  <div>Prénom : <span className="font-weight-bold">{`${firstname}`}</span></div>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between align-items-center">
                  <div>Pseudonyme : <p>www.orizons.com/<span className="font-weight-bold">{`${nickname}`}</span></p></div>
                </ListGroupItem>
                <ListGroupItem className="d-flex justify-content-between align-items-center">
                  <div>Adresse email : {email}</div>
                </ListGroupItem>
              </ListGroup>
            </Card.Body>
          </Card>
        </div>

        <div className="text-center">
          <Button
            className="m-3"
            onClick={() => {
              handleUpdateModal();
            }}
            variant="primary"
          >Modifier mes données{' '}
            <i className="far fa-edit" />
          </Button>
          <Button
            className="m-3"
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
              lastname={lastname}
              firstname={firstname}
              email={email}
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

Account.propTypes = {
  nickname: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  registration_date: PropTypes.string.isRequired,
};

export default Account;
