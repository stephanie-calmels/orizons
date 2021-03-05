import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {Button, Form, Modal} from 'react-bootstrap';
import { storage } from 'src/firebase';

import ProfileBanner from './ProfileBanner';
import ProfileInfos from './ProfileInfos';
import { useForm } from 'react-hook-form';

import './profile.scss'
import { register } from '../../actions/member';

const Profile = ({ 
  profile, 
  loadProfile, 
  profileIdFromUrl, 
  connectedUserId , 
  editProfile, 
  handleClick
}) => {
  useEffect(() => {
    //console.log(profile)
    loadProfile(profileIdFromUrl);
  }, [profileIdFromUrl]);

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
    cover: null
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

      {profile && (
      <div>
        <ProfileBanner member={profile} />
        {profileIdFromUrl == connectedUserId && <Button className="edit-profile-button" onClick={handleShow}>Editer mon profil</Button>}
        <ProfileInfos member={profile} trips={profile.trips} handleClick={handleClick}/>

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
                  // console.log('formData', formData);
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
                          // console.log('url', url);
                          formData.cover = url;
                          // console.log('formData2', formData);
                          editProfile(formData);
                          setSubmitting(false);
                        });
                    },
                  );
                  }
                  else {
                  formData.cover = profile.cover_member;
                  // console.log('formData3', formData);

                  editProfile(formData);
                  setSubmitting(false);
                  }
                  
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
                <Button variant="dark" size="lg" className="mt-3" type="submit" disabled={submitting}>
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


Profile.propTypes = { 
  profile: PropTypes.object, 
  loadProfile: PropTypes.func.isRequired, 
  profileIdFromUrl: PropTypes.string, 
  connectedUserId: PropTypes.number, 
  editProfile: PropTypes.func.isRequired, 
  handleClick: PropTypes.func.isRequired
};

export default Profile;
