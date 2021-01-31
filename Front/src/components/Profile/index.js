import React, { useEffect, useState } from 'react';
import {Button, Form, Modal} from 'react-bootstrap';

import ProfileBanner from './ProfileBanner';
import ProfileInfos from './ProfileInfos';

import './profile.scss'
import { register } from '../../actions/member';

const Profile = ({ profile, loadProfile, profileIdFromUrl, connectedUserId }) => {
  useEffect(() => {
    loadProfile(profileIdFromUrl);
  }, []);
  // console.log(profile);


  //Gestion modale modification de profil
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>

      {profile && (
      <div>
        <ProfileBanner member={profile} />
        {profileIdFromUrl == connectedUserId && <Button className="edit-profile-button" onClick={handleShow}>Editer mon profil</Button>}
        <ProfileInfos member={profile} trips={profile.trips} />
      </div>
      )}

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
              formData.localisation = localisation;
              console.log('formData', formData);
              postStep(formData);
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
                ref={register({
                  required: 'Veuillez remplir ce champ !',
                })}
              />
              {errors.title && <div className="text-danger">{errors.biography.message}</div>}
            </Form.Group>

            <Form.Group size="lg" controlId="localisation">
              <Form.Label>Localisation</Form.Label>
              <Form.Control
                name="localisation"
                as="textarea"
                rows={5}
                defaultValue={profile.localisation}
                onChange={(e) => handleChange(e)}
                ref={register({
                  required: 'Veuillez remplir ce champ !',
                })}
              />
              {errors.summary && <div className="text-danger">{errors.localisation.message}</div>}
            </Form.Group>

            <Form.Group size="lg" controlId="">
              <Form.Label>Photo de couverture</Form.Label>
              <Form.Control
              name=""
              as="file"
              defaultValue={profile.cover}
              onChange={(e)=> handleChange(e)}
              ref={register({
                required: 'Veuillez choisir une photo',
              })}
              />
            </Form.Group>
            </Form>
          </Modal.Body>
    </Modal>
    </div>
  );
};

export default Profile;
