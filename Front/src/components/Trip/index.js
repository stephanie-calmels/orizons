import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {Modal, Button, Form} from 'react-bootstrap';
import './trip.scss';

import AddStep from 'src/containers/AddStep';
import Banner from './Banner';
import Description from './Description';

const Trip = ({ trip, loadTrip, tripIdFromUrl, connectedUserId, categoriesList }) => {
  useEffect(() => {
    loadTrip(tripIdFromUrl);
  }, []);

   //Gestion modale modification de profil
   const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
    // Hooks and functions linked to the form
   // On passe par une valeur intermédiaire pour les champs ne pas modifier le store
  // tant que la modification n'a pas été validée par le serveur !
  const [values, setValues] = useState({
    title: '',
    summary: '',
    departuredate: '',
    arrivaldate: '',
    categories: [],
    localisation: '',
    coverpicture: null
  });

   const handleChange = (e) => {
     const { name, value } = e.target;
   setValues({ ...values, [name]: value });
  }
 
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
        {trip.trip.author[0].id === connectedUserId && <Button className="edit-trip-button" onClick={handleShow}>Editer mon carnet</Button>}
        <Description trip={trip.trip} steps={trip.steps} />
        <AddStep tripId={tripIdFromUrl} authorId={trip.trip.author[0].id}/>

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
                  if (formData.cover.length > 0) {
                  const uploadTask = storage.ref(`photos/profile/cover/${formData.cover[0].name}`).put(formData.cover[0]);
                  uploadTask.on(
                    'state_changed',
                    (snapshot) => {},
                    (error) => {
                      // eslint-disable-next-line no-console
                      console.log(error);
                    },
                    () => {
                      storage
                        .ref('photos/profile/cover/')
                        .child(formData.cover[0].name)
                        .getDownloadURL()
                        .then((url) => {
                          console.log('url', url);
                          formData.cover = url;
                          console.log('formData2', formData);
                          editProfile(formData);
                          setSubmitting(false);
                        });
                    },
                  );
                  }
                  else {
                  formData.cover = profile.cover_member;
                  console.log('formData3', formData);

                  editProfile(formData);
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
                defaultValue={trip.title}
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
                defaultValue={trip.summary}
                onChange={(e) => handleChange(e)}
                ref={register({
                  required: 'Veuillez remplir ce champ !',
                })}
              />
              {errors.summary && <div className="text-danger">{errors.summary.message}</div>}
            </Form.Group>
            <Form.Group size="lg" controlId="localisation">
              <Form.Label>Localisation</Form.Label>
              {/* ajouter un select avec la liste de tous les pays  */}
              <Form.Control
                name="localisation"
                type="text"
                defaultValue={trip.localisation}
                onChange={(e) => handleChange(e)}
                ref={register({
                  required: 'Veuillez remplir ce champ !',
                })}
              />
              {errors.localisation && <div className="text-danger">{errors.localisation.message}</div>}
            </Form.Group>
            <Form.Group size="lg" controlId="coverpicture">
              <Form.Label>Photo de couverture</Form.Label>
              {/*<FileBase64 multiple={false} onDone={(data)=>{
                handleImage(data) 
              }} /> */}
              <Form.Control
                name="coverpicture"
                type="file"
                defaultValue={trip.coverpicture}
                onChange={(e) => handleImage(e)}
                ref={register({
                  required: 'Veuillez sélectionner une photo',
                })}
              /> 
              {errors.coverpicture && <div className="text-danger">{errors.coverpicture.message}</div>}
            </Form.Group>
          
          
            <Form.Group size="lg" controlId="categories">
              <Form.Label>Style de votre voyage</Form.Label>
              <div>
                {categoriesList.map(category =>{
                  return <Form.Check
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
            </Form.Group>
            <Form.Group size="lg" controlId="departure">
              <Form.Label>Date de départ</Form.Label>
              <Form.Control
                name="departure"
                type="date"
                defaultValue={trip.departure}
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
                name="returndate"
                type="date"
                min={trip.departure}
                defaultValue={trip.returndate}
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
