import React from 'react';
import {Card, Container} from 'react-bootstrap';

import './styles.scss'

const Steps = ({steps})=>{
  return <div>
  <Container>
  {steps.map(step=>{
    return <Card key={step.id}>
      {step.photos.map(photo=>{
        return <Card.Img src={photo.url} style={{width:'30%'}}/>
      })}
          
          <Card.Body>
            <Card.Title> {step.title}</Card.Title>
            <Card.Subtitle>{step.date}</Card.Subtitle>
            <Card.Text>{step.content}</Card.Text>
            
          </Card.Body>
        </Card>
  })}
  </Container>
  </div>
}


export default Steps
