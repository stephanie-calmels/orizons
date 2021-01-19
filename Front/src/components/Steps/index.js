import React from 'react';
import {Card, Container} from 'react-bootstrap';
import slugify from 'slugify'
import './styles.scss'

const Steps = ({steps})=>{

  return <div>
  {/*J'ai ajouté un container sinon la carte empiétait sur les cartes des étapes */}
  <Container>
  {/*Pour chaque step du trip, on crée une nouvelle carte TODO: améliorer le style, dimensions et ajout de bordure */}
  {steps.map(step=>{
    // Je transforme les titres en slug pour les utiliser comme id de chaque carte afin de créer des ancres dans la page
    // pour plus tard TODO: refactorisation, mettre ça ailleurs puisque je le fais aussi dans Description, pour ajouter les liens sur la carte
    const sluggedTitle = slugify(step.title, {lower:true});
    
    return <Card key={step.id} id={sluggedTitle}>
    {/* On ajoute les photos dans chaque étape TODO: améliorer la disposition des photos, peut être penser à ne pas toutes les afficher s'il y en a trop */}
      {step.photos.map(photo=>{
        return <Card.Img src={photo.url} key={photo.id} style={{width:'30%'}}/>
      })}
          
          <Card.Body>
            <Card.Title> {step.title}</Card.Title>
            <Card.Subtitle>{step.date}</Card.Subtitle>
            <Card.Text>{step.content}</Card.Text>
            
          </Card.Body>
        </Card>
  })}
  </Container>
  </div>
}


export default Steps
