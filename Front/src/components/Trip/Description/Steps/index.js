import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Card, Form, Container, Row, Col, Nav, CardColumns, Modal } from 'react-bootstrap';
import slugify from 'slugify'
import './steps.scss'

const Steps = ({ steps, trip, connectedUserId })=>{

   //Gestion modale modification de carnet
   const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
   
   //Formulaire
   const {
    register, handleSubmit, errors,
  } = useForm({});
  const [submitting, setSubmitting] = useState(false);

  return <div>
  {/*J'ai ajouté un container sinon la carte empiétait sur les cartes des étapes */}
  {steps.length > 0 &&
  <Container>
  <Row>
    <Col className="nav-container">
      {steps.map(step=> {
        const sluggedTitleAsAnchor = '#' + slugify(step.step_title, {lower:true});
        // Je récupère la position de l'étape en cours dans le tableau et j'y ajoute 1 pour la barre de nav
        
        return <Nav key={step.id_step}>
          <Nav.Item>
            <Nav.Link href={sluggedTitleAsAnchor}>{step.number_step}</Nav.Link>
          </Nav.Item>
        </Nav>
      })}
    </Col>
  </Row>
  <Row>
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
            <Card >
              <Card.Img src={photo.url}  className="card-step-image" key={photo.id}/>
            </Card>
        )})}
        
      </CardColumns>    
          <Card.Body>
            <Card.Title> {step.step_title}</Card.Title>
            <Card.Subtitle>{step.number_step}</Card.Subtitle>
            <Card.Text>{step.content}</Card.Text>
            {trip.author[0].id  === connectedUserId && <Button className="edit-trip-button" onClick={handleShow}>Editer l'étape</Button>}
          </Card.Body>
        </Card>
  })}
  </Col>
  </Row>
  </Container>
  }
   {/* Modale modification d'une étape */}
   <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title>Modifier les infos de votre étape</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {/* <Form
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
                defaultValue={}
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
                defaultValue={}
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
          
          
            <Form.Group size="lg" controlId="categories">
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
            </Form.Group>
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
              {errors.returndate && <div className="text-danger">{errors.returndate.message}</div>}
            </Form.Group>
              </Form>*/}
            </Modal.Body>
        </Modal>
  </div>
}


export default Steps
