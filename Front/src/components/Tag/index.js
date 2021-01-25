import React from 'react';
import { Card, Col } from 'react-bootstrap';
import slugify from 'slugify';

import './tag.scss';

// import business from 'src/assets/ownImages/business.jpeg';
// import city_trip from 'src/assets/ownImages/citytrip.jpeg';
// import croisiere from 'src/assets/ownImages/croisiere.jpeg';
// import farniente from 'src/assets/ownImages/farniente.jpeg';
// import festival from 'src/assets/ownImages/festival.jpeg';
// import humanitaire from 'src/assets/ownImages/humanitaire.jpeg';
// import noces from 'src/assets/ownImages/noces.jpeg';
// import randonnee from 'src/assets/ownImages/randonnee.jpeg';
// import road_trip from 'src/assets/ownImages/roadtrip.jpeg';
// import safari from 'src/assets/ownImages/safari.jpeg';
// import sportif from 'src/assets/ownImages/sportif.jpeg';
// import week_end from 'src/assets/ownImages/weekend.jpeg';


const Tag = ({ category }) => {
  // const slugifiedEntitled = slugify(category.entitled, {
  //   replacement: '_',
  //   lower: true
  // });
  // console.log(slugifiedEntitled);
  return (
    <Col xs={6} md={3} lg={2}>
      <Card key={category.id} className="text-white pretty_tag">
        <Card.Img src={category.image} className="pretty_tag-image" />
        <Card.ImgOverlay className="pretty_tag-overlay">
          <Card.Title className="pretty_tag-title">{category.entitled}</Card.Title>
        </Card.ImgOverlay>
      </Card>
    </Col>
)};


export default Tag;
