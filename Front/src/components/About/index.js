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
        <Card.Img className="img" variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY0qwu0LmuFQgzpCz0veCKIAeFWDEPFIQtgA&usqp=CAU"></Card.Img>
          <Card.Body>
            <Card.Title>Kamil</Card.Title>
            <Card.Text>
              Product Owner
            </Card.Text>
          </Card.Body>
        </Card>
        
        

        <Card>
        <Card.Img className="img" variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY0qwu0LmuFQgzpCz0veCKIAeFWDEPFIQtgA&usqp=CAU"></Card.Img>
          <Card.Body>
            <Card.Title>Juliette</Card.Title>
            <Card.Text>
              Scrum Master
            </Card.Text>
          </Card.Body>
        </Card>

        

        <Card>
        <Card.Img className="img" variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY0qwu0LmuFQgzpCz0veCKIAeFWDEPFIQtgA&usqp=CAU"></Card.Img>
          <Card.Body>
            <Card.Title>Steph</Card.Title>
            <Card.Text>
              Git Master
            </Card.Text>
          </Card.Body>
        </Card>


        <Card>
        <Card.Img className="img" variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY0qwu0LmuFQgzpCz0veCKIAeFWDEPFIQtgA&usqp=CAU"></Card.Img>
          <Card.Body>
            <Card.Title>Armandine</Card.Title>
            <Card.Text>
              Lead Back
            </Card.Text>
          </Card.Body>
        </Card>

        <Card>
          <Card.Img className="img" variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY0qwu0LmuFQgzpCz0veCKIAeFWDEPFIQtgA&usqp=CAU"></Card.Img>
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
