import React, { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { Card, Form, Container, Row, Col, Nav, CardColumns, Modal, Button, InputGroup } from 'react-bootstrap';
import slugify from 'slugify'
import dayjs from 'dayjs';
import './steps.scss'
import axios from 'axios';

import { storage } from 'src/firebase';

import {
  MapContainer, TileLayer, Marker, Popup, useMap,
} from 'react-leaflet';

const Steps = ({ steps, trip, connectedUserId, editStep, deleteStep })=>{

  //Gestion modale modification de carnet
  const [show, setShow] = useState([]);

  const handleClose = (modalId) => {
    let showTest = show.slice();
    showTest[modalId] = false;
    setShow(showTest);
  };

  const handleShow = (step) => {
    setValues({...values, localisation: [step.latitude, step.longitude]})
    let showTest = show.slice();
    showTest[step.id_step] = true;
    setShow(showTest);
  };

  // Gestion modale suppression carnet
  const[showDelete, setShowDelete] = useState([]);
  const handleCloseDelete = (modalId) => {
    let showTest = showDelete.slice();
    showTest[modalId] = false;
    setShowDelete(showTest);
  };
  const handleShowDelete = (modalId) => {
    let showTest = showDelete.slice();
    showTest[modalId] = true;
    setShowDelete(showTest);
  };
  
  //Formulaire
  const {
    register, handleSubmit, errors,
  } = useForm({});
  const [submitting, setSubmitting] = useState(false);

  // Values tampons pour l'édition de l'étape
  const [values, setValues] = useState({
    title: '',
    summary: '',
    localisation:[],
    localisationInput: '',
    pictures: [],
    date: '',
    showInput: false,
    country: '',
    country_code: '',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }
  const handlePictures = (e) => setValues({...values,[e.target.name]: e.target.files});

  // FUNCTIONS LINKED TO THE MAP
  const getUserPosition = () => {
    navigator.geolocation.getCurrentPosition(((position) => {
      const userPosition = [position.coords.latitude, position.coords.longitude];
      setValues({...values, 'localisation': userPosition});
    }));
  };

  const showLocationInput = () => {
    setValues({...values,'showInput': true });
  };

  // This component will be added to the map container in order to react to certain events
  const MovingMap = () => {
    const map = useMap();
    values.localisation.length > 0 && useEffect(() => {
      map.flyTo(values.localisation);
    }, [values.localisation]);
    return null;
  };

  // Creating a draggable marker that update its position when moved
  const DraggableMarker = () => {
    const [position, setPosition] = useState(values.localisation);
    const eventHandlers = useMemo(
      () => ({
        dragend(e) {
          // We are using the endpoint of the marker drag to update our input position
          console.log(e.target);
          const newPosition = [e.target._latlng.lat, e.target._latlng.lng];
          setPosition(newPosition);
          setValues({...values, 'localisation': newPosition});
            // setInputs({...inputs, localisationInput: adresseToInput})
        },
      }),
      [],
    );
    return (
      <Marker
        draggable
        eventHandlers={eventHandlers}
        position={position}
      >
        <Popup>Position de votre étape. Déplacez le marqueur pour affiner la position.</Popup>
      </Marker>
    );
  };
  
  // adding geosearch to the form + using position stack API
  const useGeocodingApi = (event) => {
    console.log(event.target.closest('.input-group').querySelector('input').value);
    // On récupère la recherche tapée par l'utilisateur
    const userQuery = event.target.closest('.input-group').querySelector('input').value;
    const APIkey = '3e6337fefe20a03c96bfeb8a7b479717';

    axios.get(`http://api.positionstack.com/v1/forward?access_key=${APIkey}&query=${userQuery}`)
      .then((response) => {
        const newPosition = [response.data.data[0].latitude, response.data.data[0].longitude];
        setValues({...values,'localisation': newPosition});
        setValues({...values,'showInput': false});
      });
  };

  // reverse geocoding in order to get the adress of the marker at the end
  const getCountryFromAPI = () => {
    const APIkey = "3e6337fefe20a03c96bfeb8a7b479717";
    const reverseQuery = values.localisation.toString();
    axios.get(`http://api.positionstack.com/v1/reverse?access_key=${APIkey}&query=${reverseQuery}`)
    .then((response)=>{
      const currentCountry = response.data.data[0].country;
      const currentCountry_code = response.data.data[0].country_code;
      setValues({...values, 'country': currentCountry});
      setValues({...values, 'country_code':currentCountry_code});
    })
    .catch(error => {
      console.error(error);
    });
  };

  useEffect(() => {
    getCountryFromAPI();
  }, [values.localisation]);

  //-------------------------------------------- DEBUT DU COMPOSANT Steps ------------------------------------------- //
  return <div>
  {steps.length > 0 &&
  <Container>
  <Row>
    <Col className="nav-container">
      {steps.map((step, index)=> {
        const sluggedTitleAsAnchor = '#' + slugify(step.step_title, {lower:true});
        return <Nav key={step.id_step}>
          <Nav.Item>
            <Nav.Link href={sluggedTitleAsAnchor} className="step-numbers">{index + 1}</Nav.Link>
          </Nav.Item>
        </Nav>
      })} <i className="fas fa-flag-checkered icon-flag" />
    </Col>
  </Row>
  <Row className="steps_container">
  <Col>
  {/*Pour chaque step du trip, on crée une nouvelle carte TODO: améliorer le style, dimensions et ajout de bordure */}
  {steps.map(step=>{
    // Je transforme les titres en slug pour les utiliser comme id de chaque carte afin de créer des ancres dans la page
    // pour plus tard TODO: refactorisation, mettre ça ailleurs puisque je le fais aussi dans Description, pour ajouter les liens sur la carte
    const sluggedTitle = slugify(step.step_title, {lower:true});
    
    return <Card key={step.id_step} id={sluggedTitle} className="card-step">
    {/* On ajoute les photos dans chaque étape TODO: améliorer la disposition des photos, peut être penser à ne pas toutes les afficher s'il y en a trop */}
      <CardColumns className="card-step-container">
        {step.photos.map(photo=>{
          return (
            <Card key={photo.id}>
              <Card.Img src={photo.url} className="card-step-image" />
            </Card>
        )})}
        
      </CardColumns>    
          <Card.Body>
            <Card.Title> {step.step_title}</Card.Title>
            <Card.Subtitle>{step.number_step}</Card.Subtitle>
            <Card.Text>{step.content}</Card.Text>
            {
              trip.author[0].id  === connectedUserId && <div className="step_buttons">
                <Button className="edit-step-button" onClick={()=>{handleShow(step)}} ><i className="fas fa-pencil-alt" /> Editer l'étape</Button>
                <Button variant="danger" className="delete-step-button" onClick={()=>{handleShowDelete(step.id_step)}}><i className="fas fa-trash-alt" /> Supprimer l'étape</Button>
              </div>
            }
          </Card.Body>

      {/* Modale confirmation suppression de l'étape */}
      <Modal show={showDelete[step.id_step]} onHide={()=>{handleCloseDelete(step.id_step)}}>
              <Modal.Header closeButton>
                    <Modal.Title>Suppression de votre étape</Modal.Title>
              </Modal.Header>
                    <Modal.Body>
                      <p> Êtes-vous sûr de vouloir supprimer votre étape ? Toute suppression est irréversible.</p>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="danger" onClick={()=>{
                        handleCloseDelete(step.id_step);
                        deleteStep(step.id_step, step.trip_id);
                      }}>Oui, supprimer</Button>
                      <Button onClick={()=>handleCloseDelete(step.id_step)}>Annuler</Button>
                    </Modal.Footer>
              </Modal>

           {/* Modale modification d'une étape */}
   <Modal show={show[step.id_step]} onHide={()=>{handleClose(step.id_step)}} >
          <Modal.Header closeButton>
              <Modal.Title>Modifier les infos de votre étape</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <Form
            className="form-edit-step"
            onSubmit={handleSubmit((formData) => {
              handleClose(step.id_step);
              setSubmitting(true);
              formData.localisation = values.localisation;
              formData.country = values.country;
              formData.country_code = values.country_code;
              formData.trip_id = step.trip_id;
              const fileListToArray = [...formData.pictures];
              const emptyArray = [];
              const promises = [];
              fileListToArray.map(picture => {

                const uploadTask = storage.ref(`photos/trips/steps/${picture.name}`).put(picture);
                promises.push(uploadTask);
                console.log('promises inside', promises);
                uploadTask.on(
                  'state_changed',
                  (snapshot) => {},
                  (error) => {
                    // eslint-disable-next-line no-console
                    console.log(error);
                  },
                  () => {
                    storage
                      .ref('photos/trips/steps/')
                      .child(picture.name)
                      .getDownloadURL()
                      .then((url) => {
                        // fileListToArray[index]= url;
                        emptyArray.push(url)
                      });
                  },
                );
              });
              console.log('promises outside before PROMISE', promises);
              Promise.all(promises)
                .then(() => {
                // formData.pictures = fileListToArray;
                formData.pictures = emptyArray;
                console.log('formData',formData)
                setTimeout(()=>editStep(formData, step.id_step), 500);
                setSubmitting(false);
              })
            })}
          >

            <Form.Group size="lg" controlId="title">
              <Form.Label>Titre de votre étape</Form.Label>
              <Form.Control
                autoFocus
                name="title"
                type="text"
                defaultValue={step.step_title}
                onChange={(e) => handleChange(e)}
                ref={register()}
              />
              
              {errors.summary && <div className="text-danger">{errors.summary.message}</div>}
            </Form.Group>
            <Form.Group size="lg" controlId="summary">
              <Form.Label>Description de votre étape</Form.Label>
              <Form.Control
                name="summary"
                as="textarea"
                rows={5}
                defaultValue={step.content}
                onChange={(e) => handleChange(e)}
                ref={register()}
              />
              {errors.summary && <div className="text-danger">{errors.summary.message}</div>}
            </Form.Group>
            {/* INPUT LOCALISATION CUSTOM EN UTILISANT LA CARTE */}
            <Form.Group size="lg" controlId="localisation">
              <Form.Label>Localisation</Form.Label>
              <MapContainer
            // le centre de la carte dépendra de la localisation entrée au moment de la création du carnet
                center={[step.latitude, step.longitude]}
                zoom={9}
                scrollWheelZoom
                id="modal-map"
              >
                <TileLayer
                  attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MovingMap />
                {/** Quand une position est ajoutée, on place notre Marker custom créé ci dessus */}
                {values.localisation.length > 0 && <DraggableMarker />}
              </MapContainer>

              <Button onClick={getUserPosition}>Utiliser ma position</Button>
              <Button onClick={showLocationInput}>Entrer une adresse</Button>

              {values.showInput && (
              <InputGroup><Form.Control
                name="localisationInput"
                type="text"
                defaultValue={''}
                onChange={(e) => handleChange(e)}

                ref={register()}
              /> <InputGroup.Append><Button variant="outline-secondary" onClick={useGeocodingApi}>Chercher</Button></InputGroup.Append>
              </InputGroup>
              )}

              {errors.localisation && <div className="text-danger">{errors.localisation.message}</div>}
            </Form.Group>

            <Form.Group size="lg" controlId="pictures">
              <Form.Label>Ajouter des photos</Form.Label>
              <Form.Control
                name="pictures"
                type="file"
                multiple
                defaultValue={step.pictures}
                onChange={(e) => handlePictures(e)}
                ref={register()}
              />
              {errors.pictures && <div className="text-danger">{errors.pictures.message}</div>}
            </Form.Group>

            <Form.Group size="lg" controlId="date">
              <Form.Label>Date de cette étape</Form.Label>
              <Form.Control
                name="date"
                type="date"
                defaultValue={dayjs(`${step.step_date}`).format('YYYY-MM-DD')}
                onChange={(e) => handleChange(e)}
                ref={register()}
              />
              {errors.date && <div className="text-danger">{errors.date.message}</div>}
            </Form.Group>

            <Button size="lg" className="mt-3" type="submit" disabled={submitting}>
              Valider
            </Button>

          </Form>
            </Modal.Body>
        </Modal>
        </Card>

        
  })}
  </Col>
  </Row>
  </Container>
  }
  
  </div>
}


export default Steps
