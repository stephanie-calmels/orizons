import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import {
  MapContainer, TileLayer,
} from 'react-leaflet';
import './profileInfos.scss';

import ProfileTrips from './ProfileTrips';

// La map est temporaire, je vais essayer d'en mettre une plus graphique sur laquelle on pourrait colorer les pays visités

const ProfileInfos = ({ member, trips }) => (
  <Container className="profile-infos-container">
    <Row>
      <Col md={6}>
        <h2>Statistiques</h2>
        <div className="stats-container">
          <div>{trips.length} carnets publiés  </div>
          <div>12000km parcourus</div>
          <div className="flags-container"><i className="far fa-flag"> </i><i className="far fa-flag"> </i><i className="far fa-flag"> </i></div>
        </div>
      </Col>
      <Col md={6}>
        <h2>Biographie</h2>
        <p>{member.biography}</p>
      </Col>
    </Row>
    <Row>
      <Col>
        <MapContainer center={[0, 0]} zoom={1.45} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

        </MapContainer>
      </Col>
    </Row>
    {trips.length > 1 && (
      <Row>
        <Col>
          <ProfileTrips trips={trips} />
        </Col>
      </Row>
    )}
  </Container>
);

export default ProfileInfos;
