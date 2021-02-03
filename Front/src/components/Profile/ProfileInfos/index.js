import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import {
  VectorMap
} from 'react-jvectormap';
import Flag from 'react-world-flags';

import './profileInfos.scss';

import ProfileTrips from './ProfileTrips';

// La map est temporaire, je vais essayer d'en mettre une plus graphique sur laquelle on pourrait colorer les pays visités

const ProfileInfos = ({ member, trips }) => {
  // création de mapData, pour alimenter la carte
  const mapData = {
    FR: 1,
    US: 2
  }
  console.log(trips)
  return <Container>
    <Row className="infos-container">
      <Col className="stats-container">Statistiques
        <Container className="stats">
          <Row className="stats-row">
            <Col lg={6} >{trips.length} carnets publiés</Col>
            <Col lg={6}>12000km parcourus</Col>
          </Row>
          <Row className="stats-row">
            <Col lg={4}>Pays visités</Col>
            <Col lg={8}>
            {
              trips.map(trip => (
                trip.trip_localisation.map(country => (
                  <>
                    <Flag className="mr-2" key={country.id} code={country.code} height="16" title={country.fr_name} alt={country.fr_name} />
                </>
                ))
              ))
            }
            </Col>
          </Row>
        </Container> 
      </Col>

      <Col className="resume-container">
        Biographie
        <p>{member.biography}</p>
      </Col>
    </Row>
    <Row>
      <Col>
        {/* ICI LA CARTE DES PAYS VISITES */}
      <VectorMap
      map={"world_mill"}
      backgroundColor= "#79c5fb"
      zoomOnScroll= {false}
      containerStyle={{
        width: "100%",
        height: '520px'
      }}
      containerClassName="map"
      regionStyle={{
          initial: {
            fill: "#e4e4e4",
            "fill-opacity": 0.9,
            stroke: "none",
            "stroke-width": 0,
            "stroke-opacity": 0
          }
        }}
        regionsSelectable={false}
        series={{
          regions: [
            {
              values: mapData, //this is your data
              scale: ["#df7861"], //your color game's here
              normalizeFunction: "polynomial"
            }
          ]
        }}
      />
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
};

export default ProfileInfos;
