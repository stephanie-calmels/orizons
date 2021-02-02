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
    FR: 1000,
    US: 1000
  }
  console.log(trips)
  return <Container>
    <Row className="infos-container">
      <Col md={6} className="stats-container">Statistiques
        <Container>
          <Row>
            <Col lg={6} >{trips.length} carnets publiés</Col>
            <Col lg={6}>12000km parcourus</Col>
          </Row>
          <Row>
            <Col lg={3}>Pays visités</Col>
            <Col lg={9} className="flags-container">
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

      <Col md={6} className="resume-container">
        Biographie
        <p>{member.biography}</p>
      </Col>
    </Row>
    {/* <Row>
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
    </Row> */}
    <Row>
      <Col>
        {/* ICI LA CARTE DES PAYS VISITES */}
      <VectorMap
      map={"world_mill"}
      backgroundColor= "#0077be"
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
              scale: ["#146804", "#ff0000"], //your color game's here
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
