import React, {useEffect} from 'react';
import {Container, Row, Col, Card, Button, Badge} from 'react-bootstrap'
import {MapContainer, TileLayer, Marker, Popup, Polyline, useMap} from 'react-leaflet'
import dayjs from 'dayjs';

import Flag from 'react-world-flags';

import slugify from 'slugify'

import './description.scss'
import Steps from './Steps'

const Description = ({trip, steps, connectedUserId, editStep, deleteStep})=>{
  // on crée une constante pour centrer la map sur la première étape, si celle ci existe
  let mapCenter = [];
  if (steps.length > 0){
    mapCenter = [steps[0].latitude, steps[0].longitude]
  } else {
    mapCenter = [48.8534100, 2.3488000]
  }
  let mapZoom = 6;
  
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
    if (travelledDistance < 50){
      mapZoom = 10;
    }
    if (travelledDistance < 500){
      mapZoom = 8
    }
    if (travelledDistance > 1000){
      mapZoom = 4;
    }
    if (travelledDistance > 5000){
      mapZoom = 2;
    }
    return travelledDistance
  }

  // Drawing a line between steps
  const polyline = steps.map(step => [step.latitude, step.longitude]);
  const polylineOptions = {color: 'black'};

  //moving map to the right mapcenter
  const MovingMap = () => {
    const map = useMap();
   useEffect(() => {
      map.flyTo(mapCenter, mapZoom);
    }, [mapCenter]);
    return null;
  };


  

    // -------------------------------- start of the component --------------------------------------- //
  return <div>
  <Container>
    <Row className="infos-container">
        <Col className="stats-container">
        <h4 className="text-center infos-col-title">Statistiques</h4>
        <Container>
          <Row className="stats-row">
            <Col lg={12}><i className="fas fa-clock mr-2 stats-icons"></i>Durée : {trip.duration} jour(s)</Col>
          </Row>
          <Row className="stats-row">
            <Col lg={12}><i className="fas fa-road mr-2 stats-icons"></i>Distance : {Math.round(calculateDistanceBewteenAllSteps(steps))} km</Col>
          </Row>
          <Row className="stats-row">
            <Col lg={12}><i className="fas fa-flag mr-2 stats-icons"></i>Pays visités : 
            {
              trip.trip_localisation.map(country => (
                  <Flag className="ml-2" key={country.id} code={country.code} height="16" title={country.fr_name} alt={country.fr_name}/>
              ))
            }
            </Col>
          </Row>
          <Row className="stats-row">
            <Col xs={12} lg={4}><i className="fas fa-tag mr-2 stats-icons"></i>Catégorie(s)</Col>
            <Col xs={12} lg={8}>
            {
              trip.categories.map(category => (
                <Badge pill key={category.id} className="tag" style={{backgroundColor: `${category.color}`}}>
                  {category.entitled}
                </Badge>                 
              ))
            }
            </Col>
          </Row>
        </Container> 
        </Col>

        <Col className="resume-container">
        <h4 className="text-center infos-col-title">Description du voyage</h4>
        <p>{trip.summary}</p>
        </Col>
    </Row>
    <Row >
    <Col>
    {/*On crée la map et on la centre sur la position de la première étape si elle existe */}
    <MapContainer center={mapCenter} zoom={6} scrollWheelZoom={false} >
    <MovingMap />
  <TileLayer
    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  {steps.map((step, i) =>{
    // Je prépare de quoi faire un lien vers une ancre de la page (format: #id)
    const sluggedTitleAsAnchor = '#' + slugify(step.step_title, {lower:true});

    return <Marker key={step.id_step} position={[step.latitude, step.longitude]} >
      <Popup>
        <Card className="card-on-map">
          <Card.Img className="card-on-map-img" src={step.photos[0].url} style={{height:'10vh'}}/>
          <Card.Body className="card-on-map-body">
            <Card.Title className="card-on-map-title"> {step.step_title}</Card.Title>
            {/* <Card.Subtitle>{dayjs(`${step.step_date}`).format('DD/MM/YYYY')}</Card.Subtitle> */}
            <Button variant="link" href={sluggedTitleAsAnchor}> Voir le détail</Button>
          </Card.Body>
        </Card>
      </Popup>
    </Marker>
  })}
  <Polyline pathOptions={polylineOptions} positions={polyline} />
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
