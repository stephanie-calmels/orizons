import React, {
  useState, useRef, useMemo, useEffect,
} from 'react';
import PropTypes from 'prop-types';

import { storage } from 'src/firebase';

import {
  MapContainer, TileLayer, Marker, Popup, useMap,
} from 'react-leaflet';

import {
  Modal, Button, Form, InputGroup,
} from 'react-bootstrap';

import { useForm } from 'react-hook-form';

import axios from 'axios';

const AddStep = ({
  title, 
  summary, 
  date, 
  localisation, 
  pictures, 
  localisationInput, 
  showInput, 
  postStep, 
  changeField, 
  country, 
  country_code, 
  connectedUserId, 
  trip 
}) => {
  // Hooks and functions linked to Modal components
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Hooks and functions linked to state
  const handleChange = (e) => {
    changeField([e.target.name], e.target.value);

  };
  const handlePictures = (e) => changeField([e.target.name], e.target.files);
  const {
    register, handleSubmit, errors,
  } = useForm({});
  const [submitting, setSubmitting] = useState(false);

  // FUNCTIONS LINKED TO THE MAP
  const getUserPosition = () => {
    navigator.geolocation.getCurrentPosition(((position) => {
      const userPosition = [position.coords.latitude, position.coords.longitude];
      changeField('localisation', userPosition);
    }));
  };

  const showLocationInput = () => {
    changeField('showInput', true );
  };

  // This component will be added to the map container in order to react to certain events
  const MovingMap = () => {
    const map = useMap();
    localisation.length > 0 && useEffect(() => {
      map.flyTo(localisation, 8);
    }, [localisation]);
    return null;
  };

  // Creating a draggable marker that update its position when moved
  const DraggableMarker = () => {
    const [position, setPosition] = useState(localisation);
    const eventHandlers = useMemo(
      () => ({
        dragend(e) {
          // We are using the endpoint of the marker drag to update our input position
          // console.log(e.target);
          const newPosition = [e.target._latlng.lat, e.target._latlng.lng];
          setPosition(newPosition);
          changeField('localisation', newPosition);
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
  
  const [suggestions, setSuggestions] = useState([]);
  // adding geosearch to the form + using position stack API
  const [timer, setTimer] = useState(null);
  const useGeocodingApi = (event) => {
    // On récupère la recherche tapée par l'utilisateur   
    const userQuery = event.target.value;
    const APIkey = '2c49cacd86be35f2ab3ca742f4632e45';
    setTimer(clearTimeout(timer));
    setTimer(window.setTimeout(()=>{axios.get(`http://api.positionstack.com/v1/forward?access_key=${APIkey}&query=${userQuery}`)
      .then((response) => {
        setSuggestions(response.data.data);
        let options = document.getElementById('places_suggestions').options;
        if (options.length > 0) {
          console.log(options);
          changeField('country', options[0].dataset.country);
          changeField('country_code', options[0].dataset.country_code);
          changeField('localisation', [options[0].dataset.latitude, options[0].dataset.longitude]);
        }
      });
    }, 1000))
  };
 
  // reverse geocoding in order to get the adress of the marker at the end
  const getCountryFromAPI = () => {
    const APIkey = "2c49cacd86be35f2ab3ca742f4632e45";
    const reverseQuery = localisation.toString();
    axios.get(`http://api.positionstack.com/v1/reverse?access_key=${APIkey}&query=${reverseQuery}`)
    .then((response)=>{
     const currentCountry = response.data.data[0].country;
      const currentCountry_code = response.data.data[0].country_code;
      changeField('country', currentCountry);
      changeField('country_code', currentCountry_code);
    })
    .catch(error => {
      console.error(error);
    });
  };

  useEffect(() => {
    getCountryFromAPI();
  }, [localisation]);

  // START OF ADDSTEP COMPONENT
  return (
    <div>

            {connectedUserId == trip.author[0].id && <div className="add-step-container"><Button onClick={handleShow} className="add-step-button"> Ajouter une étape </Button></div>}


      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="form-title">
          <Modal.Title>Ajouter une étape</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            className="form-add-step"
            onSubmit={handleSubmit((formData) => {
              handleClose();
              setSubmitting(true);
              formData.localisation = localisation;
              formData.country = country;
              formData.country_code = country_code;
              formData.trip_id = trip.id;
              const fileListToArray = [...formData.pictures];
              const emptyArray = [];
              const promises = [];
              fileListToArray.map(picture => {

                const uploadTask = storage.ref(`photos/trips/steps/${picture.name}`).put(picture);
                promises.push(uploadTask);
                // console.log('promises inside', promises);
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
              Promise.all(promises)
                .then(() => {
                // formData.pictures = fileListToArray;
                formData.pictures = emptyArray;
                console.log('formDataPictures',formData)
                setTimeout(() => postStep(formData), 500);
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
                center={[48.866667, 2.333333]}
                zoom={2}
                scrollWheelZoom={false}
                id="modal-map"
              >
                <TileLayer
                  attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MovingMap />
                {/** Quand une position est ajoutée, on place notre Marker custom créé ci dessus */}
                {localisation.length > 0 && <DraggableMarker />}
              </MapContainer>

              <div className="form_buttons">
                <Button onClick={getUserPosition} className="form-button form-button-gps">Utiliser ma position</Button>
                <Button onClick={showLocationInput} className="form-button form-button-gps">Entrer une adresse</Button>
              </div>

              {showInput && (
              <InputGroup>
                <Form.Control
                  name="localisationInput"
                  type="text"
                  defaultValue={localisationInput}
                  onChange={(e) => {
                    handleChange(e);
                    if (e.target.value.length > 2) {
                      useGeocodingApi(e);
                    }
                  }}
                  list="places_suggestions"
                  ref={register({
                    required: 'Veuillez remplir ce champ !',
                  })}
                />
                <datalist id="places_suggestions">
                  {
                    suggestions.map(suggestion => {
                      return (
                        <option 
                          value={suggestion.label} 
                          key={suggestion.latitude} 
                          data-country={suggestion.country}
                          data-country_code={suggestion.country_code}
                          data-latitude={suggestion.latitude}
                          data-longitude={suggestion.longitude}>
                        </option>
                      )
                    })
                  }
                </datalist>
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
                min={trip.departure_date}
                defaultValue={date}
                onChange={(e) => handleChange(e)}
                ref={register({
                  required: 'Veuillez remplir ce champ !',
                })}
              />
              {errors.date && <div className="text-danger">{errors.date.message}</div>}
            </Form.Group>

            <Button size="lg" className="form-button" type="submit" disabled={submitting}>
              Valider
            </Button>

          </Form>

        </Modal.Body>
      </Modal>
    </div>
  );
};

AddStep.propTypes = {
  title: PropTypes.string, 
  summary: PropTypes.string, 
  date: PropTypes.string, 
  localisation: PropTypes.array, 
  pictures: PropTypes.array, 
  localisationInput: PropTypes.string, 
  showInput: PropTypes.bool.isRequired, 
  postStep: PropTypes.func.isRequired, 
  changeField: PropTypes.func.isRequired, 
  country: PropTypes.string, 
  country_code: PropTypes.string, 
  connectedUserId: PropTypes.number, 
  trip: PropTypes.object 
};

export default AddStep;
