import React from 'react';
import {
  CardDeck, Card, Nav, Col, Row, Container, Badge
} from 'react-bootstrap';

import './profileTrips.scss';

const ProfileTrips = ({ trips, handleClick }) => {
  console.log(trips);
  return (
    <CardDeck>
      <Container>
        <Row>
          {trips.map((trip) => (
            <Col md={6} lg={4} xl={3} key={trip.id}>
              <div onClick={() => handleClick(trip.id)} style={{cursor: 'pointer'}}>
                <Card className="card_trip">
                  <Card.Img className="card_trip-img-top" variant="top" src={trip.cover_trip} />
                  <Card.Body className="card_trip-body">
                    <Card.Title className="card_trip-title">
                      {trip.title}
                    </Card.Title>
                    <Card.Text className="card_trip-text">
                      {trip.summary}
                    </Card.Text>
                    <Card.Text className="card_trip-text">
                        {trip.categories.map(category => (
                            <Badge pill key={category.id} className="tag" style={{backgroundColor: `${category.color}`}}>
                              {category.entitled}
                            </Badge>                 
                        ))}
                      </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </CardDeck>
  );
};

export default ProfileTrips;
