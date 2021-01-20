import React from 'react';
import { CardDeck, Card, Container, Badge, Image, Button, Row, Col } from 'react-bootstrap';

import './trips.scss';

const Trips = ({ trips, showMoreResults }) => (
    <Container>
        <h1 className="main-title">Explorer les carnets de voyage publiés par la communauté</h1>
        <CardDeck>
          <Row>
            {trips.map(trip => (
              <Col md={6} lg={4} xl={3}>
                <Card key={trip.id}>
                  <Card.Img variant="top" src={trip.cover_photo.url} />
                  <Card.Body>
                  <Card.Title>{trip.title}</Card.Title>
                  <Card.Text>
                      {trip.summary}
                  </Card.Text>
                  <Card.Text>
                    {trip.categories.map(category => (
                      
                        <Badge pill key={category.id} className="tag" style={{backgroundColor: `${category.color}`}}>
                          {category.entitled}
                        </Badge>                 
                    ))}
                  </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                  <Image className="profile_photo m-2" src={trip.author.profile_photo.url} roundedCircle />
                  <small className="text-muted">{trip.author.nickname}</small>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </CardDeck>
        

        <Row className="justify-content-md-center m-4">
          <Col md="auto">
            <Button variant="link" onClick={showMoreResults}>Afficher plus de carnets</Button>
          </Col>
        </Row>
        

    </Container>
);

export default Trips;

