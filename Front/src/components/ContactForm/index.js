import React, { useState } from 'react';


import './contactForm.scss';

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

  

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    
    <form className="form_contact" onSubmit={handleSubmit}>
      <h1>Contactez-nous</h1>

      <label>Name</label>
      <input
        placeholder="Nom"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Email</label>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label>Message</label>
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>

      <button className="button"
        type="submit"
      >
        Envoyez
      </button>
    </form>
  );
};


export default ContactForm;
