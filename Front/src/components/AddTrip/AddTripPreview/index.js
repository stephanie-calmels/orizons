import React from 'react';
import PropTypes from 'prop-types';

import {Card, Badge} from 'react-bootstrap';
import Flag from 'react-world-flags';
import dayjs from 'dayjs';

const AddTripPreview =({
  title, 
  summary, 
  localisation, 
  categories, 
  departure, 
  returndate, 
  coverpicture, 
  country_code
})=>{
  
  return <div>
    <Card className="card_trips card_trips_preview">
      <Card.Img className="card_trips-img-top" variant="top" src={coverpicture} />
      <Card.Body className="card_trips-body">
        <Card.Title className="card_trips-title">{title}</Card.Title>
        <Card.Subtitle className="card_trips-subtitle">{departure && dayjs(`${departure}`).format('DD/MM/YYYY')} {returndate && "jusqu'au"} {returndate && dayjs(`${returndate}`).format('DD/MM/YYYY')}</Card.Subtitle>
        <Card.Subtitle className="card_trips-subtitle"> <Flag code={country_code} height="16"/></Card.Subtitle>
        <Card.Text className="card_trips-text">
          {summary}
        </Card.Text>
        <Card.Text className="card_trips-text">
          {categories.map(category => (
            <Badge pill key={category.id} className="tag" style={{backgroundColor: `${category.color}`}}>
              {category.entitled}
            </Badge>                 
          ))}
        </Card.Text>
      </Card.Body>
    </Card>
  </div>
}

AddTripPreview.propTypes = {
  title: PropTypes.string, 
  summary: PropTypes.string, 
  localisation: PropTypes.string, 
  categories: PropTypes.array, 
  departure: PropTypes.string, 
  returndate: PropTypes.string, 
  coverpicture: PropTypes.string, 
  country_code: PropTypes.string, 
};

export default AddTripPreview
