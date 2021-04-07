import React from 'react';
import Container from 'react-bootstrap/Container'
import Title from '../PageTitle';

import './legals.scss'

const Legals = () => {
  const date = new Date();
  return <div>
      <Title texte="Mentions légales" />
      <Container className="legals">
        <ul>
          <li className="legals-list-item">Site hébergé par Amazon Web Services, Inc.P.O. Box 81226 Seattle, WA 98108-1226 USA</li>
        </ul>      
      </Container>
    </div>
};

export default Legals;
