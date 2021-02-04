import React from 'react';
import {Card, Badge} from 'react-bootstrap';
import Flag from 'react-world-flags';

const AddTripPreview =({title, summary, localisation, categories, departure, returndate, coverpicture, country_code})=>{
  
  return <div>
    <Card className="card_trips">
      <Card.Img className="card_trips-img-top" variant="top" src={coverpicture} />
      <Card.Body className="card_trips-body">
        <Card.Title className="card_trips-title">{title}</Card.Title>
                    {/*Corriger l'affichage de la date dans le bon sens */}
        <Card.Subtitle>{departure} {returndate && "jusqu'au"} {returndate}</Card.Subtitle>
        <Card.Subtitle><Flag code={country_code} height="16"/></Card.Subtitle>
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

export default AddTripPreview
