import React from 'react';
import { Nav } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import './footer.scss';

const Footer = () => (
  <footer className="footer">
    <Nav className="justify-content-center">
      <Nav.Item>
        <LinkContainer to="/mentions-legales">
          <Nav.Link eventKey="link-1">Mentions légales</Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/a-propos">
          <Nav.Link eventKey="link-2">A propos</Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/contact">
          <Nav.Link eventKey="link-3">Contact</Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item className="flex-row">
        <Nav.Link eventKey="link-4"><i className="fab fa-instagram"></i></Nav.Link>
        <Nav.Link eventKey="link-5"><i className="fab fa-facebook"></i></Nav.Link>
        <Nav.Link eventKey="link-6"><i className="fab fa-twitter"></i></Nav.Link>
      </Nav.Item>
    </Nav>
  </footer>
);

export default Footer;
