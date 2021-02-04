import React from 'react';
import {Container, Row, Col, Card, Button} from 'react-bootstrap'
import {MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet'
import Flag from 'react-world-flags';

import slugify from 'slugify'

import './description.scss'
import Steps from './Steps'

const Description = ({trip, steps, connectedUserId, editStep, deleteStep})=>{
  // on crée une constante pour centrer la map sur la première étape, si celle ci existe
  let mapCenter =[]
  if (steps.length> 0){
    mapCenter = [steps[0].latitude, steps[0].longitude];
  } else{
    mapCenter= [48.856614,2.3522219]
  }
  const distanceCalculatorBetween2points = (lat1, lon1, lat2, lon2)=>{
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  }

  const calculateDistanceBewteenAllSteps = (allSteps) =>{
    let travelledDistance = 0;
    for (let i = 0; i<(allSteps.length - 1); i++){
      travelledDistance += distanceCalculatorBetween2points(allSteps[i].latitude, allSteps[i].longitude, allSteps[i+1].latitude, allSteps[i+1].longitude)
    }
    return travelledDistance
  }


  return <div>
  <Container>
    <Row className="infos-container">
        <Col md={6} className="stats-container">Statistiques
        <Container>
          <Row>
            <Col xs={4} lg={3}>Durée</Col>
            <Col xs={4} lg={3}>Distance</Col>
            <Col xs={4} lg={6}>Pays</Col>
          </Row>
          <Row>
            <Col xs={4} lg={3}>{trip.duration} jours</Col>
            <Col xs={4} lg={3}>{Math.round(calculateDistanceBewteenAllSteps(steps))} km</Col>
            <Col xs={4} lg={6}>
            {
              trip.trip_localisation.map(country => (
                  <Flag className="mr-2" key={country.id} code={country.code} height="16" title={country.fr_name} alt={country.fr_name}/>
              ))
            }
            </Col>
          </Row>
          <Row>
            {trip.categories.map(category =>{
              return <Col key={category.id}>{category.entitled}</Col>
            })}
          </Row>
        </Container> 
        </Col>

        <Col md={6} className="resume-container">
        Description du voyage
        <p>{trip.summary}</p>
        </Col>
    </Row>
    <Row >
    <Col>
    {/*On crée la map et on la centre sur la position de la première étape si elle existe */}
    <MapContainer center={mapCenter} zoom={6} scrollWheelZoom={false}>
  <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  {steps.map(step =>{
    // Je prépare de quoi faire un lien vers une ancre de la page (format: #id)
    const sluggedTitleAsAnchor = '#' + slugify(step.step_title, {lower:true});

    return <Marker key={step.id_step} position={[step.latitude, step.longitude]}>
      <Popup>
        <Card >
          <Card.Img src={step.photos[0].url} style={{height:'10vh'}}/>
          <Card.Body>
            <Card.Title> {step.step_title}</Card.Title>
            <Card.Subtitle>{step.number_step}</Card.Subtitle>
            <Button variant="link" href={sluggedTitleAsAnchor}> Voir le détail</Button>
          </Card.Body>
        </Card>
      </Popup>
    </Marker>
  })}
  </MapContainer>
    </Col>
    </Row>
    <Row>
      <Steps steps={steps} trip={trip} connectedUserId={connectedUserId} editStep={editStep} deleteStep={deleteStep}/>
    </Row>
  </Container>
  </div>
};


export default Description
