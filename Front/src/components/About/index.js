import React from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';

import './about.scss'

const About = () => {
  //const teamMembers =
  return <div className="about">
    <h1>O'rizons</h1>
      <p>Une envie de conserver vos souvenirs ? 
      De partager vos expériences sans vous encombrez d'une diversité d'outils numériques ? O'rizons vous permet de publier, explorer et partager un carnet de voyage connecté.</p>
    
    <CardDeck>
        <Card>
        <Card.Img className="img" variant="top" src="https://ca.slack-edge.com/T018S94MBUY-U018XGBSWDP-d41d27ad106a-512"></Card.Img>
          <Card.Body>
            <Card.Title>Kamil</Card.Title>
            <Card.Text>
              Product Owner
            </Card.Text>
          </Card.Body>
        </Card>
        
        

        <Card>
        <Card.Img className="img" variant="top" src="https://ca.slack-edge.com/T018S94MBUY-U01846K5SG7-f25fc70a8b26-512"></Card.Img>
          <Card.Body>
            <Card.Title>Juliette</Card.Title>
            <Card.Text>
              Scrum Master
            </Card.Text>
          </Card.Body>
        </Card>

        

        <Card>
        <Card.Img className="img" variant="top" src="https://ca.slack-edge.com/T018S94MBUY-U0198NZKVT2-ecfac0f3a55b-512"></Card.Img>
          <Card.Body>
            <Card.Title>Steph</Card.Title>
            <Card.Text>
              Git Master
            </Card.Text>
          </Card.Body>
        </Card>


        <Card>
        <Card.Img className="img" variant="top" src="https://ca.slack-edge.com/T018S94MBUY-U018R2G9V60-f3e12639031e-512"></Card.Img>
          <Card.Body>
            <Card.Title>Armandine</Card.Title>
            <Card.Text>
              Lead Back
            </Card.Text>
          </Card.Body>
        </Card>

        <Card>
          <Card.Img className="img" variant="top" src="https://ca.slack-edge.com/T018S94MBUY-U01FWGGJ1S5-618ba15e20dd-512"></Card.Img>
          <Card.Body>
            <Card.Title>Paul</Card.Title>
            <Card.Text>
              Lead Front
            </Card.Text>
          </Card.Body>
        </Card>

    </CardDeck>
  </div>
};

export default About;
