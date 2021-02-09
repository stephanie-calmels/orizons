import React, { useEffect } from 'react';
import { CardDeck, Card, Container, Badge, Image, Button, Row, Col } from 'react-bootstrap';
import Tag from 'src/containers/Tag';
import Title from '../PageTitle';

import './trips.scss';


const Trips = ({ filteredTrips, categories, showMoreResults, loadTrips, loadCategories, handleClick }) => {
  useEffect(() => {
    loadTrips();
    loadCategories();
  },[]);

  return (
    // <div className="background-image-register">
    <Container>
        <Title texte="Explorez les carnets de voyage de la communauté" />

        <CardDeck> 
          <Row>
            {categories.map(category => (
              <Tag key={category.id} category={category} />
            ))}
          </Row>
        </CardDeck>

        <CardDeck>
          <Container>
          {filteredTrips.length ==0 && <p style={{marginTop:1+'rem'}}>Il n'y a rien ici. Pour le moment...</p> }

            <Row>
              {filteredTrips.map(trip => (
                <Col md={6} lg={4} xl={3} key={trip.id}>
                  <div onClick={() => handleClick(trip.id)} style={{cursor: 'pointer'}}>
                    <Card className="card_trips">
                      <Card.Img className="card_trips-img-top" variant="top" src={trip.cover_trip} />
                      <Card.Body className="card_trips-body">
                      <Card.Title className="card_trips-title">{trip.title}</Card.Title>
                      <Card.Text className="card_trips-text">
                          {trip.summary}
                      </Card.Text>
                      {/* <Card.Text className="card_trips-text">
                        {trip.categories.map(category => (
                            <Badge pill key={category.id} className="tag" style={{backgroundColor: `${category.color}`}}>
                              {category.entitled}
                            </Badge>                 
                        ))}
                      </Card.Text> */}
                      </Card.Body>
                      <Card.Footer className="card_trips-footer">
                      <Image className="profile_photo m-2" src={trip.author[0].profile_photo} roundedCircle />
                      <small className="text-muted">{trip.author[0].nickname}</small>
                      </Card.Footer>
                    </Card>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </CardDeck>
        
        {/* <Row className="justify-content-md-center m-4">
          <Col md="auto">
            <Button variant="link" onClick={showMoreResults}>Afficher plus de carnets</Button>
          </Col>
        </Row> */}

    </Container>
    // </div>
  );
};


export default Trips;
