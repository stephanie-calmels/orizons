import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import {
  VectorMap
} from 'react-jvectormap';
import Flag from 'react-world-flags';

import './profileInfos.scss';

import ProfileTrips from './ProfileTrips';

// La map est temporaire, je vais essayer d'en mettre une plus graphique sur laquelle on pourrait colorer les pays visités

const ProfileInfos = ({ member, trips, handleClick }) => {
  // création de mapData, pour alimenter la carte
  const mapData = {
    FR: 1,
    CD: 1,
    NA: 1
  }
  return <Container>
    <Row className="infos-container">
      <Col className="stats-container">Statistiques
        <Container className="stats">
          <Row className="stats-row">
            <Col lg={6} ><i class="fas fa-book-open mr-2 stats-icons"></i>{trips[0] != null ? trips.length : 0} carnet(s) publié(s)</Col>
            <Col lg={6}><i class="fas fa-road mr-2 stats-icons"></i>12000km parcourus</Col>
          </Row>
          <Row className="stats-row">
            <Col lg={4}><i class="fas fa-flag mr-2 stats-icons"></i>Pays visités</Col>
            <Col lg={8}>
            {trips[0] != null ?
              trips.map(trip => (
                trip.trip_localisation.map(country => (
                  <>
                    <Flag className="mr-2" key={country.id} code={country.code} height="16" title={country.fr_name} alt={country.fr_name} />
                </>
                ))
              ))
              : null
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
      backgroundColor= "#C9E4FF"
      zoomOnScroll= {false}
      containerStyle={{
        width: "100%",
        height: '520px'
      }}
      containerClassName="map"
      regionStyle={{
          initial: {
            fill: "#ffffff",
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
              scale: ["#161d6f"], //your color game's here
              normalizeFunction: "polynomial"
            }
          ]
        }}
      />
      </Col>
    </Row>
    {trips[0] !== null && (
      <Row>
        <Col>
          <ProfileTrips trips={trips} handleClick={handleClick}/>
        </Col>
      </Row>
    )}
  </Container>
};

export default ProfileInfos;
