import React, { useState } from 'react';
import {
  Container, Form, Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import categoriesList from 'src/data/categories';

import AddTripPreview from './AddTripPreview'

const AddTrip = () => {
  const [inputs, setInputs] = useState({
    title: '',
    summary: '',
    localisation: '',
    categories: [],
    departure: '',
    returndate: '',
  });

  const {
    title, summary, localisation, categories, departure, returndate
  } = inputs;

  const handleChange = (e) => setInputs({ ...inputs, [e.target.name]: e.target.value });

  const handleCheckbox = (e)=> {
    console.log(e.target.name)
    
    setInputs({...inputs, [e.target.name]: [...categories, e.target.value]})
  }
  // Hook qui vient de React Hook Form
  // https://react-hook-form.com/get-started
  const {
    register, handleSubmit, errors,
  } = useForm({});
  // on cherche à voir si le serveur a bien reçu les infos
  const [submitting, setSubmitting] = useState(false);

  return <div>
    <h1>Créer un nouveau carnet</h1>
    <Container>
      <Form
            className="form-add-trip"
            onSubmit={handleSubmit((formData) => {
              // on récupère un objet avec toutes les données. Envoyées seulement si correctes
              setSubmitting(true);
              // eslint-disable-next-line no-console
              console.log('formData', formData);
              // TODO: requête AXIOS pour envoyer les infos au serveur

              setSubmitting(false);
            })}
          >
        <Form.Group size="lg" controlId="title">
            <Form.Label>Titre de votre voyage</Form.Label>
            <Form.Control
              autoFocus
              name="title"
              type="text"
              defaultValue={title}
              onChange={(e) => handleChange(e)}
              // on attache notre input au React Hook Form pour les critères de validation
              ref={register({
                // si le champ n'est pas rempli lors de la soumission, le champ se met en focus
                required: 'Veuillez remplir ce champ !',
              })}
            />
            {errors.title && <div className="text-danger">{errors.title.message}</div>}
          </Form.Group>
          <Form.Group size="lg" controlId="summary">
            <Form.Label>Description de votre voyage</Form.Label>
            <Form.Control
              autoFocus
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
          <Form.Group size="lg" controlId="localisation">
            <Form.Label>Localisation</Form.Label>
            <Form.Control
              autoFocus
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
                required: 'Veuillez remplir ce champ !',
              })}
            />
            })}
           </div>
            {errors.categories && <div className="text-danger">{errors.categories.message}</div>}
          </Form.Group>
          <Form.Group size="lg" controlId="departure">
            <Form.Label>Date de départ</Form.Label>
            <Form.Control
              autoFocus
              name="departure"
              type="text"
              defaultValue={departure}
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
              autoFocus
              name="returndate"
              type="text"
              defaultValue={returndate}
              onChange={(e) => handleChange(e)}
              ref={register({
                required: 'Veuillez remplir ce champ !'
              })}
            />
            {errors.returndate && <div className="text-danger">{errors.returndate.message}</div>}
          </Form.Group>
          {/* A la soumission du form, en attente de la réponse serveur le bouton est désactivé */}
          <Button block size="lg" className="mt-3" type="submit" disabled={submitting}>
            Valider
          </Button>  
      </Form>

    </Container>
    <AddTripPreview />
  </div>
}

export default AddTrip;
