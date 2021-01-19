import React from 'react';
import {Container, Row, Col} from 'react-bootstrap'
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'

import './styles.scss'

const Description = ({trip})=>{
  console.log(trip)
  return <div>
  <Container>
    <Row>
        <Col md={6}>Statistiques
        {/* Changer le container en div
        <Container>
          <Row>
            <Col>Durée</Col>
            <Col>Distance</Col>
          </Row>
          <Row>
            <Col>{trip.duration} jours</Col>
            <Col>12000 km</Col>
          </Row>
          <Row>
            {trip.categories.map(category =>{
              return <Col key={category.id}>{category.entitled}</Col>
            })}
          </Row>
        </Container> */}
        </Col>
        <Col md={6}>
        Description du voyage
        <p>{trip.summary}</p>
        </Col>
    </Row>
    <Row>
    <Col>
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[51.505, -0.09]}>
    <Popup>
      A pretty CSS3 popup. <br /> Easily customizable.
    </Popup>
  </Marker>
</MapContainer>
    </Col>
    
    </Row>
  </Container>




  
  </div>
}


export default Description
