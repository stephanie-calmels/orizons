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
  let mapData = {};
  if (member.trips[0]) { member.trips.forEach(trip => (
    trip.trip_localisation.forEach(localisation => (
      mapData[localisation.code_2] = 1
    ))
  ))}
  console.log(mapData);
  return <Container>
    <Row className="infos-container">
      <Col className="stats-container">
      <h4 className="text-center infos-col-title">Statistiques</h4>
        <Container className="stats">
          <Row className="stats-row">
            <Col lg={6} ><i className="fas fa-book-open mr-2 stats-icons"></i>{trips[0] != null ? trips.length : 0} carnet(s) publié(s)</Col>
            {/* <Col lg={6}><i className="fas fa-road mr-2 stats-icons"></i>12000km parcourus</Col> */}
          </Row>
          <Row className="stats-row">
            <Col lg={12}><i className="fas fa-flag mr-2 stats-icons"></i>Pays visités : 
            
            {trips[0] != null ?
              trips.map(trip => (
                trip.trip_localisation.map(country => (
                  <>
                    <Flag className="ml-2" key={country.id} code={country.code} height="16" title={country.fr_name} alt={country.fr_name} />
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
      <h4 className="text-center infos-col-title">Biographie</h4>
        <p>{member.biography}</p>
      </Col>
    </Row>
    <Row>
      <Col className="map-container">
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
