import React, { useState } from 'react';
import {
  Container, Form, Button, Row, Col
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import AddTripPreview from './AddTripPreview'
import './addtrip.scss'

// import FileBase64 from 'react-file-base64';

const AddTrip = ({title, summary, localisation, categories, departure, returndate, coverpicture, categoriesList, changeField, postTrip}) => {

  const handleChange = (e) => changeField([e.target.name], e.target.value );
  const handleCheckbox = (e)=> {
    // Je suis obligé de refaire un find ici, je ne pouvais pas récupérer l'objet catégorie depuis le formulaire, seulement une string
    const clickedCategory = categoriesList.find(category => category.entitled == e.target.value);
    const index = categories.indexOf(clickedCategory);
    // Si index > -1, c'est à dire si notre clickedCategory existe déjà dans le state, alors on la supprime avec splice
    if (index > -1){
      categories.splice(index, 1);
      return changeField([e.target.name],[...categories]);
    }
    // Sinon on l'ajoute au tableau des catégories
    changeField([e.target.name],[...categories, clickedCategory]);
  }
  const handleImage =(e)=>{
    // creating a blob in order to add the image to the trip preview
    console.log(e.target.files)
    let imageBlob = new Blob([e.target.files[0]], {type: 'image/jpeg'});
    let blobLink = URL.createObjectURL(imageBlob);
    changeField([e.target.name], blobLink)
  }
  const {
    register, handleSubmit, errors,
  } = useForm({});
  const [submitting, setSubmitting] = useState(false);

  

  return <div>
    <h1 className="text-center p4 font-weight-bold">Créer un nouveau carnet</h1>
    <Container>
      <Form
        className="form-add-trip"
        onSubmit={handleSubmit((formData) => {
        setSubmitting(true);
        console.log('formData',formData);
        postTrip(formData)
        setSubmitting(false);
        })}
      >
        <Row>
          <Col sm={12} md={6} lg={4}>
            <Form.Group size="lg" controlId="title">
              <Form.Label>Titre de votre voyage</Form.Label>
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
              <Form.Label>Description de votre voyage</Form.Label>
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
            <Form.Group size="lg" controlId="localisation">
              <Form.Label>Localisation</Form.Label>
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
            <Form.Group size="lg" controlId="coverpicture">
              <Form.Label>Photo de couverture</Form.Label>
              {/*<FileBase64 multiple={false} onDone={(data)=>{
                handleImage(data) 
              }} /> */}
              <Form.Control
                name="coverpicture"
                type="file"
                defaultValue={coverpicture}
                onChange={(e) => handleImage(e)}
                ref={register({
                  required: 'Veuillez sélectionner une photo',
                })}
              /> 
              {errors.coverpicture && <div className="text-danger">{errors.coverpicture.message}</div>}
            </Form.Group>
          </Col>
          <Col sm={12} md={6} lg={4}>
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
                name="returndate"
                type="date"
                min={departure}
                defaultValue={returndate}
                onChange={(e) => handleChange(e)}
                ref={register({
                })}
              />
              {errors.returndate && <div className="text-danger">{errors.returndate.message}</div>}
            </Form.Group>
          </Col>
          <Col lg={4} className="trip-preview-container">
            <AddTripPreview title={title} summary={summary} localisation={localisation} categories={categories} coverpicture={coverpicture} departure={departure} returndate={returndate}/>
          </Col>
          <Button size="lg" className="mt-3" type="submit" disabled={submitting}>
            Valider
          </Button>  
        </Row> 
      </Form>            
    </Container>
  </div>
}

export default AddTrip;
