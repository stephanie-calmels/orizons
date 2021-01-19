import React from 'react';
import { Navbar, Nav, DropdownButton, Dropdown, Form, Button, FormControl, InputGroup, Image } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';


import './header.scss';

const Header = ({ isLogged }) => {
  return (
    <Navbar className="Navbar" sticky="top" collapseOnSelect expand="lg" bg="light" variant="light">
    <LinkContainer to="/">
      <Navbar.Brand >O'rizons</Navbar.Brand>
    </LinkContainer>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
        <LinkContainer to="/ajouter-carnet">
          <Nav.Link>Publier son carnet de voyage</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/exploration">
          <Nav.Link>Explorer les carnets de voyage</Nav.Link>
        </LinkContainer>
        </Nav>
        <Form inline>
          <InputGroup>
            <FormControl type="text" placeholder="Rechercher un carnet, un profil, etc."/>
            <InputGroup.Append>
               <Button variant="outline-success">Search</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
        <Nav className="profile">
        {/* Lorsque l'utilisateur est connecté on affiche son profil à la place de Se connecter.. */}
          {isLogged ? 
          <>
            <Image className="profile_photo m-2" src="https://resize-parismatch.lanmedia.fr/r/416,416/img/var/news/storage/images/paris-match/people-a-z/ryan-gosling/6048588-4-fre-FR/Ryan-Gosling.jpg" roundedCircle />
            <DropdownButton 
              title="Ryan Gosling" 
              id="dropdown-menu-align-right"
              menuAlign="right"
              >
              <LinkContainer to='/profile/:pseudo'>
                <Nav.Link>Mon profil</Nav.Link>
              </LinkContainer>
              
              <LinkContainer to='/compte'>
                <Nav.Link>Paramètres du compte</Nav.Link>
              </LinkContainer>

              <Dropdown.Divider />
              <Dropdown.Item eventKey="3">Se déconnecter</Dropdown.Item>
            </DropdownButton>
          </>
          : 
          <>
            <LinkContainer to='/connexion'>
              <Nav.Link >Se connecter</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/inscription'>
              <Nav.Link eventKey={1}>S'inscrire</Nav.Link>
            </LinkContainer>
          </>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
};

export default Header;
