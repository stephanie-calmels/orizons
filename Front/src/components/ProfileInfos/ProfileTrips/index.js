import React from 'react';
import{CardDeck, Card, Nav} from 'react-bootstrap'

import './profileTrips.scss';

const ProfileTrips = ({trips})=>{
  console.log(trips)
  return <CardDeck>
  {trips.map(trip =>{
    return <Card key ={trip.id}>
      <Card.Img src={trip.cover_photo.url} />
      <Card.Title>{trip.title}</Card.Title>
      <Card.Subtitle>{trip.summary}</Card.Subtitle>
      <Card.Footer>
        <Nav>
          {trip.categories.map(category=>{
            // préparation pour avoir des liens vers chaque catégorie TODO:
            const linkToCategoryPage = 'http://orizons.com/category';
            return <Nav.Item key={category.id}>
              <Nav.Link href="" >{category.entitled}</Nav.Link>
            </Nav.Item>
          })}
        </Nav>
      </Card.Footer>
    </Card>
  })}
  </CardDeck>
};

export default ProfileTrips;
