import React, { useState} from 'react';

import {Form, Button, Container} from 'react-bootstrap';


import './contactForm.scss';

//handle submit is not defined
const ContactForm = () => {
    const [values, setValues] = useState({name: '', email: '', message: ''})
    const {name, email, message} = values;

    const handleSubmit = e => {
      e.preventDefault();
    }
    const handleInputChange = e => {
      const {name, value} = e.target
      setValues({...values, [name]: value})
    }
  return (
        <Container className="contact_container">
              <div className="contact_form">
                  <Form className="form_contact" onSubmit={handleSubmit}>
                    <Form.Group controlId="name">
                      <Form.Label>Nom</Form.Label>
                        <Form.Control
                          defaultValue={name}
                          type="text"
                          onChange={handleInputChange}
                          placeholder="nom"/>
                        </Form.Group>
                    
                    <Form.Group controlId="email">
                        <Form.Label>Adresse mail</Form.Label>
                          <Form.Control 
                            type="text" 
                            placeholder="exemple@email.com"
                            onChange={handleInputChange}
                            defaultValue={email} />
                    </Form.Group>

                    <Form.Group controlId="message">
                      <Form.Label>Message</Form.Label>
                        <Form.Control 
                          type="text"
                          placeholder="Votre message:"
                          onChange={handleInputChange}
                          defaultValue={message}
                          />
                    </Form.Group>
                    <Button type="submit">Envoyez</Button>
                  </Form>
              </div>
            
        </Container>
  
  );
};

export default ContactForm;
