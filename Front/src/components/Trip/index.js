import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {Modal, Button, Form, InputGroup} from 'react-bootstrap';
import { storage } from 'src/firebase';
import './trip.scss';
import AddStep from 'src/containers/AddStep';
import Banner from './Banner';
import Description from './Description';
import dayjs from 'dayjs';

const Trip = ({ trip, loadTrip, tripIdFromUrl, connectedUserId, categoriesList,
  countries, editTrip, deleteTrip, editStep, deleteStep }) => {
  useEffect(() => {
    loadTrip(tripIdFromUrl);
  }, []);

   //Gestion modale modification de carnet
   const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
    // Hooks and functions linked to the form
   // On passe par une valeur intermédiaire pour les champs ne pas modifier le store
  // tant que la modification n'a pas été validée par le serveur !
  const [values, setValues] = useState({
    title: '',
    summary: '',
    departureDate: '',
    arrivalDate: '',
    categories: [],
    localisation: '',
    coverpicture: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }
  const handleCheckbox = (e) => {
    // Je suis obligé de refaire un find ici, je ne pouvais pas récupérer l'objet catégorie depuis le formulaire, seulement une string
    const clickedCategory = categoriesList.find(category => category.entitled == e.target.value);
    const index = categories.indexOf(clickedCategory);
    // Si index > -1, c'est à dire si notre clickedCategory existe déjà dans le state, alors on la supprime avec splice
    if (index > -1){
      categories.splice(index, 1);
      return setValues([e.target.name],[...categories]);
    }
    // Sinon on l'ajoute au tableau des catégories
    setValues([e.target.name],[...categories, clickedCategory]);
  }

  // Gestion modale suppression carnet
  const[showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const {
    register, handleSubmit, errors,
  } = useForm({});
  const [submitting, setSubmitting] = useState(false);

  return (
    <div>
      {trip && (
      <div>
        <Banner
          author={trip.trip.author[0]}
          picture={trip.trip.cover_trip}
          title={trip.trip.title}
        />
        {trip.trip.author[0].id === connectedUserId && <>
        <Button className="edit-trip-button" onClick={handleShow}><i className="fas fa-pencil-alt" /> Editer le carnet</Button>
        <Button className="delete-trip-button" onClick={handleShowDelete} variant="danger"><i className="fas fa-trash-alt" /> Supprimer le carnet</Button>
        </>
        }
        <Description trip={trip.trip} steps={trip.steps} connectedUserId={connectedUserId} editStep={editStep} deleteStep={deleteStep}/>
        <AddStep authorId={trip.trip.author[0].id} connectedUserId={connectedUserId} realTripId={trip.trip.id}/> 

        {/* Modale confirmation suppression de carnet */}
        <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
              <Modal.Title>Suppression de votre carnet</Modal.Title>
        </Modal.Header>
              <Modal.Body>
                <p> Êtes-vous sûr de vouloir supprimer votre carnet de voyage ? Toute suppression est irréversible.</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={()=>{
                  handleCloseDelete();
                  deleteTrip();
                }}>Oui, supprimer</Button>
                <Button onClick={handleCloseDelete}>Annuler</Button>
              </Modal.Footer>
        </Modal>


        {/* Modale modification de carnet */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title>Modifier les infos de votre carnet</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form
                className="form-edit-trip"
                onSubmit={handleSubmit((formData) => {
                  handleClose();
                  setSubmitting(true);
                  console.log('formData', formData);
                  if (formData.coverpicture.length > 0) {
                  const uploadTask = storage.ref(`photos/trips/cover/${formData.coverpicture[0].name}`).put(formData.coverpicture[0]);
                  uploadTask.on(
                    'state_changed',
                    (snapshot) => {},
                    (error) => {
                      // eslint-disable-next-line no-console
                      console.log(error);
                    },
                    () => {
                      storage
                        .ref('photos/trips/cover/')
                        .child(formData.coverpicture[0].name)
                        .getDownloadURL()
                        .then((url) => {
                          console.log('url', url);
                          formData.cover = url;
                          console.log('formData2', formData);
                          editTrip(formData);
                          setSubmitting(false);
                        });
                    },
                  );
                  }
                  else {
                  formData.cover = trip.trip.cover_trip;
                  console.log('formData3', formData);

                  editTrip(formData);
                  setSubmitting(false);
                  }
                  
                })}
              >

            <Form.Group size="lg" controlId="title">
              <Form.Label>Titre de votre voyage</Form.Label>
              <Form.Control
                autoFocus
                name="title"
                type="text"
                defaultValue={trip.trip.title}
                onChange={(e) => handleChange(e)}
                ref={register({
                  required: 'Veuillez remplir ce champ !',
                })}
              />
              {errors.title && <div className="text-danger">{errors.title.message}</div>}
            </Form.Group>
            <Form.Group size="lg" controlId="summary">
              <Form.Label>Description de votre voyage</Form.Label>
              <Form.Control
                name="summary"
                as="textarea"
                rows={5}
                defaultValue={trip.trip.summary}
                onChange={(e) => handleChange(e)}
                ref={register({
                  required: 'Veuillez remplir ce champ !',
                })}
              />
              {errors.summary && <div className="text-danger">{errors.summary.message}</div>}
            </Form.Group>
            <Form.Group size="lg" controlId="localisation">
              <Form.Label>Localisation</Form.Label>
                <InputGroup>
                  <Form.Control
                    as="select"
                    name="country_code"
                    defaultValue={trip.trip.trip_localisation[0].code}
                    onChange={(e) => handleChange(e)}
                    ref={register({
                      required: 'Veuillez remplir ce champ !',
                    })}
                  >
                    {
                      countries.map((country) => (
                        <option key={country.id} value={country.code}>{country.fr_name}</option>
                      ))
                    }
                  </Form.Control>
                </InputGroup>  
            </Form.Group>
            <Form.Group size="lg" controlId="coverpicture">
              <Form.Label>Photo de couverture</Form.Label>
              <Form.Control
                name="coverpicture"
                type="file"
                defaultValue={''}
                onChange={(e) => handleImage(e)}
                ref={register()}
              /> 
              {errors.coverpicture && <div className="text-danger">{errors.coverpicture.message}</div>}
            </Form.Group>
          
          
           {/*} <Form.Group size="lg" controlId="categories">
              <Form.Label>Style de votre voyage</Form.Label>
              <div>
                {categoriesList.map(category =>{
                  let categoryClicked = trip.trip.categories.find(categoryInTrip => categoryInTrip.entitled == category.entitled )
                    if (categoryClicked){
                      return <Form.Check
                    key={category.id}
                    type="checkbox"
                    label={category.entitled}
                    name="categories"
                    value={category.entitled}
                    onChange={(e) => handleCheckbox(e)}
                    checked
                    ref={register({
                      required: 'Veuillez sélectionner au moins une catégorie !',
                  })}
                  />
                    }
                  else return <Form.Check
                    key={category.id}
                    type="checkbox"
                    label={category.entitled}
                    name="categories"
                    value={category.entitled}
                    onChange={(e) => handleCheckbox(e)}
                    
                    ref={register({
                      required: 'Veuillez sélectionner au moins une catégorie !',
                  })}
                  />
                  
                    })}
              </div>
              {errors.categories && <div className="text-danger">{errors.categories.message}</div>}
            </Form.Group> */}
            <Form.Group size="lg" controlId="departure">
              <Form.Label>Date de départ</Form.Label>
              <Form.Control
                name="departureDate"
                type="date"
                defaultValue={dayjs(`${trip.trip.departure_date}`).format('YYYY-MM-DD')}
                onChange={(e) => handleChange(e)}
                ref={register({
                  required: 'Veuillez remplir ce champ !',
                })}
              />
              {errors.departure && <div className="text-danger">{errors.departure.message}</div>}
            </Form.Group>
            <Form.Group size="lg" controlId="returndate">
              <Form.Label>Date de retour</Form.Label>
              <Form.Control
                name="arrivalDate"
                type="date"
                min={dayjs(`${trip.trip.departure_date}`).format('YYYY-MM-DD')}
                defaultValue={dayjs(`${trip.trip.arrival_date}`).format('YYYY-MM-DD')}
                onChange={(e) => handleChange(e)}
                ref={register({
                })}
              />
              {errors.returndate && <div className="text-danger">{errors.returndate.message}</div>}
            </Form.Group>
          
          
                <Button size="lg" className="mt-3" type="submit" disabled={submitting}>
                Valider
                </Button>
              </Form>
            </Modal.Body>
        </Modal>
      </div>
      )}
    </div>
  );
};

export default Trip;
