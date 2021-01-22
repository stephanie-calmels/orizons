import React, {useState} from 'react';

import { MapContainer, TileLayer, Marker, Popup, useMapEvent, useMapEvents } from 'react-leaflet';
import {Modal, Button, Form, Container, Row} from 'react-bootstrap';
import {useForm} from 'react-hook-form';

const AddStep =()=>{
  // Hooks and functions linked to Modal components
  const [show, setShow] = useState(false)
  const handleClose =()=> setShow(false);
  const handleShow = ()=> setShow(true);

  //Hooks and functions linked to the Form
  const [inputs, setInputs] = useState({
    title: '',
    localisation: '',
    date: '',
    summary: '',
    pictures : []
  });

  const {
    title, localisation, date, summary, pictures
  } = inputs;

  const handleChange = (e) => setInputs({ ...inputs, [e.target.name]: e.target.value });
  const handlePictures = (e) => setInputs({...inputs, [e.target.name]: [...pictures, e.target.files]})
  const {
    register, handleSubmit, errors,
  } = useForm({});
  const [submitting, setSubmitting] = useState(false);

  // FUNCTIONS LINKED TO THE MAP
  const getUserPosition = ()=>{navigator.geolocation.getCurrentPosition((position=>console.log(position)))}

  return <div>
    <Button onClick={handleShow}>
      Ajouter une étape
    </Button>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ajouter une étape</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form
            className="form-add-step"
            onSubmit={handleSubmit((formData) => {
              setSubmitting(true);
              console.log('formData', formData);
              // TODO: requête AXIOS pour envoyer les infos au serveur

              setSubmitting(false);
            })}
          >
  
        <Form.Group size="lg" controlId="title">
            <Form.Label>Titre de votre étape</Form.Label>
            <Form.Control
              autoFocus
              name="title"
              type="text"
              defaultValue={title}
              onChange={(e) => handleChange(e)}
              ref={register({
                required: 'Veuillez remplir ce champ !',
              })}
            />
            {errors.title && <div className="text-danger">{errors.title.message}</div>}
          </Form.Group>
          <Form.Group size="lg" controlId="summary">
            <Form.Label>Description de votre étape</Form.Label>
            <Form.Control
              name="summary"
              as="textarea"
              rows={5}
              defaultValue={summary}
              onChange={(e) => handleChange(e)}
              ref={register({
                required: 'Veuillez remplir ce champ !',
              })}
            />
            {errors.summary && <div className="text-danger">{errors.summary.message}</div>}
          </Form.Group>

          {/* INPUT LOCALISATION CUSTOM EN UTILISANT LA CARTE */}
          <Form.Group size="lg" controlId="localisation">
            <Form.Label>Localisation</Form.Label>
            <MapContainer 
      // le centre de la carte dépendra de la localisation entrée au moment de la création du carnet
      center={[48.866667, 2.333333]} 
      zoom={13} 
      scrollWheelZoom={true}
      id="modal-map"
            >
              <TileLayer
                    attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
            </MapContainer>
            <Button onClick={getUserPosition}>Utiliser ma position</Button>
            <Form.Control
              name="localisation"
              type="text"
              defaultValue={localisation}
              onChange={(e) => handleChange(e)}
              ref={register({
                required: 'Veuillez remplir ce champ !',
              })}
            />
            {errors.localisation && <div className="text-danger">{errors.localisation.message}</div>}
          </Form.Group>


          <Form.Group size="lg" controlId="pictures">
            <Form.Label>Ajouter des photos</Form.Label>
            <Form.Control
              name="pictures"
              type="file"
              multiple
              defaultValue={pictures}
              onChange={(e) => handlePictures(e)}
              ref={register({
                required: 'Veuillez ajouter au moins une photo',
              })}
            />
            {errors.pictures && <div className="text-danger">{errors.pictures.message}</div>}
          </Form.Group>
          
          <Form.Group size="lg" controlId="date">
            <Form.Label>Date de cette étape</Form.Label>
            <Form.Control
              name="date"
              type="date"
              defaultValue={date}
              onChange={(e) => handleChange(e)}
              ref={register({
                required: 'Veuillez remplir ce champ !',
              })}
            />
            {errors.date && <div className="text-danger">{errors.date.message}</div>}
          </Form.Group>
          
          <Button size="lg" className="mt-3" type="submit" disabled={submitting}>
            Valider
          </Button>  
        
      </Form>
               
  
      </Modal.Body>
    </Modal>
  </div>
};

export default AddStep;
