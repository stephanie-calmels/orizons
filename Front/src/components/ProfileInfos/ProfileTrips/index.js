import React from 'react';
import{CardDeck, Card, Nav, Col, Row} from 'react-bootstrap'

import './profileTrips.scss';

const ProfileTrips = ({trips})=>{
  console.log(trips)
  return <CardDeck>
    <Row>
      {trips.map(trip =>{
        return <Col md={6} lg={4} xl={3} key={trip.id}>
          <Card>
          <Card.Img src={trip.cover_photo.url} />
          <Card.Title>{trip.title}</Card.Title>
          <Card.Subtitle>{trip.summary}</Card.Subtitle>
          <Card.Footer className="card_profile_trips-footer">
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
        </Col>
      })}
    </Row>
  </CardDeck>
};

export default ProfileTrips;
