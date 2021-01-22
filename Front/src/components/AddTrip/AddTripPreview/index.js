import React from 'react';
import {Card, Badge} from 'react-bootstrap';

const AddTripPreview =({inputs})=>{
  
  return <div>
    <Card className="card_trips">
                  <Card.Img className="card_trips-img-top" variant="top" src={inputs.coverpicture} />
                  <Card.Body className="card_trips-body">
                  <Card.Title className="card_trips-title">{inputs.title}</Card.Title>
                  {/*Corriger l'affichage de la date dans le bon sens */}
                  <Card.Subtitle>{inputs.departure} {inputs.returndate && "jusqu'au"} {inputs.returndate}</Card.Subtitle>
                  <Card.Subtitle>{inputs.localisation}</Card.Subtitle>
                  <Card.Text className="card_trips-text">
                      {inputs.summary}
                  </Card.Text>
                  <Card.Text className="card_trips-text">
                    {inputs.categories.map(category => (
                      
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
