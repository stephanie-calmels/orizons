import React from 'react';
import PropTypes from 'prop-types';

import { Card, Col } from 'react-bootstrap';

import './tag.scss';

const Tag = ({ category, handleClick }) => {
  return (
    <Col xs={6} md={3} lg={2} >
      <div onClick={() => handleClick(category.id)} style={{cursor: 'pointer'}}>
        <Card className="text-white pretty_tag">
          <Card.Img src={require(`src/assets/ownImages/${category.image}`)} className="pretty_tag-image" />
          <Card.ImgOverlay className="pretty_tag-overlay">
            <Card.Title className="pretty_tag-title">{category.entitled}</Card.Title>
          </Card.ImgOverlay>
        </Card>
      </div>
    </Col>
)};

Tag.propTypes = {
  category: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default Tag;
