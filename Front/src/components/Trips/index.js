import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { CardDeck, Card, Container, Image, Button, Row, Col } from 'react-bootstrap';
import Tag from 'src/containers/Tag';
import Title from '../PageTitle';

import './trips.scss';


const Trips = ({ 
  filteredTrips, 
  categories, 
  showMoreResults, 
  loadTrips, 
  loadCategories, 
  handleClick 
}) => {
  useEffect(() => {
    loadTrips();
    loadCategories();
  },[]);

  return (
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
  );
};

Trips.propTypes = { 
  filteredTrips: PropTypes.arrayOf(PropTypes.object).isRequired, 
  categories: PropTypes.arrayOf(PropTypes.object).isRequired, 
  showMoreResults: PropTypes.func, 
  loadTrips: PropTypes.func.isRequired, 
  loadCategories: PropTypes.func.isRequired, 
  handleClick: PropTypes.func.isRequired 
}

export default Trips;
