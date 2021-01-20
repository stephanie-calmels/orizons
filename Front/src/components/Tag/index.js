import React from 'react';
import { Card, Col } from 'react-bootstrap';

import './tag.scss';

const Tag = ({ category }) => (
  <Col xs={6} md={3} lg={2}>
    <Card key={category.id} className="text-white pretty_tag">
      <Card.Img src={category.image} className="pretty_tag-image" />
      <Card.ImgOverlay className="pretty_tag-overlay">
        <Card.Title className="pretty_tag-title">{category.entitled}</Card.Title>
      </Card.ImgOverlay>
    </Card>
  </Col>
);

export default Tag;
