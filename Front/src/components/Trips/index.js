import React from 'react';
import { CardDeck, Card, Container, Badge, Image } from 'react-bootstrap';

import './trips.scss';

const Trips = ({ trips }) => (
    <Container>
        <h1 className="main-title">Explorer les carnets de voyage publiés par la communauté</h1>
        <CardDeck>
        {trips.map(trip => (
            <Card key={trip.id}>
                <Card.Img variant="top" src={trip.cover_photo.url} />
                <Card.Body>
                <Card.Title>{trip.title}</Card.Title>
                <Card.Text>
                    {trip.summary}
                </Card.Text>
                {trip.categories.map(category => (
                  <Badge pill key={category.id} className="tag" style={{backgroundColor: `${category.color}`}}>
                    {category.entitled}
                  </Badge>
                  ))}
                </Card.Body>
                <Card.Footer className="card-footer">
                <Image className="profile_photo m-2" src={trip.author.profile_photo.url} roundedCircle />
                <small className="text-muted">{trip.author.nickname}</small>
                </Card.Footer>
            </Card>
        ))}
        </CardDeck>
    </Container>
);

export default Trips;

