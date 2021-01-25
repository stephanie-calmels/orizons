import React, {useState, useRef, useMemo, useEffect} from 'react';


import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

import {Modal, Button, Form, InputGroup} from 'react-bootstrap';
import {useForm} from 'react-hook-form';

import axios from 'axios';


const AddStep =()=>{
  // Hooks and functions linked to Modal components
  const [show, setShow] = useState(false)
  const handleClose =()=> setShow(false);
  const handleShow = ()=> setShow(true);

  //Hooks and functions linked to the Form
  const [inputs, setInputs] = useState({
    title: '',
    localisation: [],
    date: '',
    summary: '',
    pictures : [],
    showInput: false,
    localisationInput:''
  });

  const {
    title, localisation, date, summary, pictures, showInput, localisationInput
  } = inputs;

  const handleChange = (e) => setInputs({ ...inputs, [e.target.name]: e.target.value });
  const handlePictures = (e) => setInputs({...inputs, [e.target.name]: [...pictures, e.target.files]})
  const {
    register, handleSubmit, errors,
  } = useForm({});
  const [submitting, setSubmitting] = useState(false);

  // FUNCTIONS LINKED TO THE MAP
  const getUserPosition = ()=>{
    navigator.geolocation.getCurrentPosition((position=>{
      let userPosition = [position.coords.latitude, position.coords.longitude];
    setInputs({...inputs, localisation : userPosition})
  }))}

  const showLocationInput = ()=>{
    setInputs({...inputs, showInput: true})
  }
  // This component will be added to the map container in order to react to certain events
  const MovingMap = ()=>{
    const map = useMap();
    inputs.localisation.length > 0 && useEffect(()=>{
      map.flyTo(inputs.localisation)
    }, [inputs.localisation])

    return null;
  }
  // Creating a draggable marker that update its position when moved

  const DraggableMarker = ()=>{
    const [position, setPosition] = useState(inputs.localisation);
    const eventHandlers = useMemo(
      ()=>({
        dragend(e){
          // We are using the endpoint of the marker drag to update our input position
          const newPosition = [e.target._latlng.lat, e.target._latlng.lng]
            setPosition(newPosition);
            setInputs({...inputs, localisation : newPosition});
            
        }
      }),
      []
    )
    return (
      <Marker
      draggable
      eventHandlers={eventHandlers}
      position={position}>
        <Popup>Position de votre étape</Popup>
      </Marker>
    )
  }
  // adding geosearch to the form
  const useGeocodingApi= (event)=>{
    console.log(event.target.closest('.input-group').querySelector('input').value)
    //On récupère la recherche tapée par l'utilisateur
    const userQuery = event.target.closest('.input-group').querySelector('input').value
    const APIkey = "3e6337fefe20a03c96bfeb8a7b479717"

    axios.get(`http://api.positionstack.com/v1/forward?access_key=${APIkey}&query=${userQuery}`)
    .then((response)=>{
      const newPosition= [response.data.data[0].latitude, response.data.data[0].longitude];
      setInputs({...inputs, localisation: newPosition})
    })

    
  }

  // START OF ADDSTEP COMPONENT
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
            center={[45, -1]} 
            zoom={13} 
            scrollWheelZoom={true}
            id="modal-map"
          >
            <TileLayer
                  attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MovingMap />
                {/**Quand une position est ajoutée, on place notre Marker custom créé ci dessus */}
            {inputs.localisation.length > 0 && <DraggableMarker />}    
          </MapContainer>

            <Button onClick={getUserPosition}>Utiliser ma position</Button>
            <Button onClick={showLocationInput}>Entrer une adresse</Button>

            {inputs.showInput && <InputGroup><Form.Control
              name="localisationInput"
              type="text"
              defaultValue={localisationInput}
              onChange={handleChange}
              
              ref={register({
                required: 'Veuillez remplir ce champ !',
              })}
            /> <InputGroup.Append><Button variant="outline-secondary" onClick={useGeocodingApi}>Chercher</Button></InputGroup.Append></InputGroup>}


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
