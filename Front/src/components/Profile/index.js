import React, { useEffect, useState } from 'react';
import {Button, Form, Modal} from 'react-bootstrap';

import ProfileBanner from './ProfileBanner';
import ProfileInfos from './ProfileInfos';
import { useForm } from 'react-hook-form';

import './profile.scss'
import { register } from '../../actions/member';

const Profile = ({ profile, loadProfile, profileIdFromUrl, connectedUserId , editProfile}) => {
  useEffect(() => {
    loadProfile(profileIdFromUrl);
  }, []);
  console.log(profile);


  //Gestion modale modification de profil
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

   // Hooks and functions linked to the form
   // On passe par une valeur intermédiaire pour les champs ne pas modifier le store
  // tant que la modification n'a pas été validée par le serveur !
  const [values, setValues] = useState({
    biography: '',
    localisation: '',
    coverpicture: null
  });

   const handleChange = (e) => {
     const { name, value } = e.target;
   setValues({ ...values, [name]: value });
  }
  console.log(values)
   const {
     register, handleSubmit, errors,
   } = useForm({});
   const [submitting, setSubmitting] = useState(false);

  return (
    <div>

      {profile && (
      <div>
        <ProfileBanner member={profile} />
        {profileIdFromUrl == connectedUserId && <Button className="edit-profile-button" onClick={handleShow}>Editer mon profil</Button>}
        <ProfileInfos member={profile} trips={profile.trips} />

         {/* Modale modification de profil */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
              <Modal.Title>Modifier vos infos de profil</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form
                className="form-edit-profile"
                onSubmit={handleSubmit((formData) => {
                  handleClose();
                  setSubmitting(true);
                  console.log('formData', formData);
                  editProfile(formData);
                  setSubmitting(false);
                })}
              >

                <Form.Group size="lg" controlId="biography">
                  <Form.Label>Biographie</Form.Label>
                  <Form.Control
                    autoFocus
                    name="biography"
                    type="text"
                    defaultValue={profile.biography}
                    onChange={(e) => handleChange(e)}
                    ref={register()}
                  />
                  {errors.title && <div className="text-danger">{errors.biography.message}</div>}
                </Form.Group>

                <Form.Group size="lg" controlId="localisation">
                  <Form.Label>Localisation</Form.Label>
                  <Form.Control
                    name="localisation"
                    type="text"
                    rows={5}
                    defaultValue={profile.localisation}
                    onChange={(e) => handleChange(e)}
                    ref={register()}
                  />
                  {errors.summary && <div className="text-danger">{errors.localisation.message}</div>}
                </Form.Group>

                <Form.Group size="lg" controlId="cover">
                  <Form.Label>Photo de couverture</Form.Label>
                  <Form.Control
                  name="cover"
                  type="file"
                  onChange={(e)=> handleChange(e)}
                  ref={register()}
                  />
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

export default Profile;
