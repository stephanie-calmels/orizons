import React from 'react';
import { Nav } from 'react-bootstrap';

import './footer.scss';

const Footer = () => {
  return (
    <Nav className="justify-content-center">
      <Nav.Item>
        <Nav.Link eventKey="link-1">Mentions légales</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2">A propos</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-3">Contact</Nav.Link>
      </Nav.Item>
      <Nav.Item className="flex-row">
        <Nav.Link eventKey="link-4"><i className="fab fa-instagram"></i></Nav.Link>
        <Nav.Link eventKey="link-5"><i className="fab fa-facebook"></i></Nav.Link>
        <Nav.Link eventKey="link-6"><i className="fab fa-twitter"></i></Nav.Link>
      </Nav.Item>
    </Nav>
  )
};

export default Footer;
