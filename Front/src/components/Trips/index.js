import React from 'react';
import { CardDeck, Card, Container } from 'react-bootstrap';

const Trips = ({ trips }) => (
    <Container>
        <h1>Je suis dans la TRIPS</h1>
        <CardDeck>
        {trips.map(trip => (
            <Card key={trip.id}>
                <Card.Img variant="top" src={trip.cover_photo.url} />
                <Card.Body>
                <Card.Title>{trip.title}</Card.Title>
                <Card.Text>
                    {trip.summary}
                </Card.Text>
                </Card.Body>
                <Card.Footer>
                <small className="text-muted">{trip.author.nickname}</small>
                </Card.Footer>
            </Card>
        ))}
        </CardDeck>
    </Container>
);

export default Trips;

