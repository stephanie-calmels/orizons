import React from 'react';
import {Card, Container, Row, Col, Nav, CardColumns} from 'react-bootstrap';
import slugify from 'slugify'
import './steps.scss'

const Steps = ({steps})=>{

  return <div>
  {/*J'ai ajouté un container sinon la carte empiétait sur les cartes des étapes */}
  <Container>
  <Row>
    <Col className="nav-container">
      {steps.map(step=>{
        const sluggedTitleAsAnchor = '#' + slugify(step.title, {lower:true});
        // Je récupère la position de l'étape en cours dans le tableau et j'y ajoute 1 pour la barre de nav
        const stepNumber = steps.indexOf(step) + 1;
        return <Nav key={step.id}>
          <Nav.Item>
            <Nav.Link href={sluggedTitleAsAnchor}>{stepNumber}</Nav.Link>
          </Nav.Item>
        </Nav>
      })}
    </Col>
  </Row>
  <Row>
  <Col>
  {/*Pour chaque step du trip, on crée une nouvelle carte TODO: améliorer le style, dimensions et ajout de bordure */}
  {steps.map(step=>{
    // Je transforme les titres en slug pour les utiliser comme id de chaque carte afin de créer des ancres dans la page
    // pour plus tard TODO: refactorisation, mettre ça ailleurs puisque je le fais aussi dans Description, pour ajouter les liens sur la carte
    const sluggedTitle = slugify(step.title, {lower:true});
    
    return <Card key={step.id} id={sluggedTitle} className="card-steps">
    {/* On ajoute les photos dans chaque étape TODO: améliorer la disposition des photos, peut être penser à ne pas toutes les afficher s'il y en a trop */}
      <CardColumns className="card-images-container">
          {step.photos.map(photo=>{
            return <Card className="image-card" key={photo.id}><Card.Img src={photo.url}  className="card-steps-image"/></Card>
          })}
      </CardColumns>    
          <Card.Body>
            <Card.Title> {step.title}</Card.Title>
            <Card.Subtitle>{step.date}</Card.Subtitle>
            <Card.Text>{step.content}</Card.Text>
            
          </Card.Body>
        </Card>
  })}
  </Col>
  </Row>
  </Container>
  </div>
}


export default Steps
