import React from 'react';
import { Navbar, Nav, DropdownButton, Dropdown, Form, Button, FormControl, InputGroup, Image } from 'react-bootstrap';


import './header.scss';

const Header = ({ isLogged }) => {
  return (
    <Navbar sticky="top" collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Brand href="#home">O'rizons</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#publier">Publier son carnet de voyage</Nav.Link>
          <Nav.Link href="#explorer">Explorer les carnets de voyage</Nav.Link>
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
              <Dropdown.Item eventKey="1">Mon profil</Dropdown.Item>
              <Dropdown.Item eventKey="2">Paramètres du compte</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item eventKey="3">Se déconnecter</Dropdown.Item>
            </DropdownButton>
          </>
          : 
          <>
            <Nav.Link href="#connexion">Se connecter</Nav.Link>
            <Nav.Link eventKey={1} href="#inscription">S'inscrire</Nav.Link>
          </>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
};

export default Header;
