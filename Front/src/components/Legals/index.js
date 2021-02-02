import React from 'react';
import Container from 'react-bootstrap/Container'

import './legals.scss'

const Legals = () => {
  return <div className="legals">
    

    <div className="text">
      <Container>
      <h1>Mentions légales </h1>
        <h2>Site web appartenant à la team O'rizons.</h2>
        <p>Nom : O'rizons</p>
        <p>Prénom : Michel</p>
        <p>Adresse email : michel@oclock.com</p>
        <p>Numéro de téléphone : 01-02-03-04-05</p>
        <p>Adresse :42 avenue de l'univers, Pré-au-Lard.</p>
      
      </Container>
    </div>
</div>
};

export default Legals;
