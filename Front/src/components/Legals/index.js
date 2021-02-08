import React from 'react';
import Container from 'react-bootstrap/Container'
import Title from '../PageTitle';

import './legals.scss'

const Legals = () => {
  const date = new Date();
  return <div>
      <Title texte="Mentions légales" />
      <Container className="legals">
        <h2 className="legals-title">Site web appartenant à la team O'rizons &copy; {date.getFullYear()} </h2>
        <ul>
          <li className="legals-list-item"><span className="item">Nom : </span>O'rizons</li>
          <li className="legals-list-item"><span className="item">Prénom : </span>Michel</li>
          <li className="legals-list-item"><span className="item">Adresse email : </span>michel@oclock.com</li>
          <li className="legals-list-item"><span className="item">Numéro de téléphone : </span>01-02-03-04-05</li>
          <li className="legals-list-item"><span className="item">Adresse : </span>42 avenue de l'univers, Pré-au-Lard.</li>
        </ul>

        <h2 className="legals-title">Technologies utilisées</h2>
        <ul>
          <li className="legals-list-item"><span className="item">Front :</span>React.js, Redux, React Boostrap, SCSS, Leaflet.js</li>
          <li className="legals-list-item"><span className="item">Back :</span>Node.js, Express, PostgreSQL Sqitch, Heroku </li>
        </ul>
      
      </Container>
    </div>
};

export default Legals;
