import React from 'react';
import PropTypes from 'prop-types';
import {
  Navbar, Nav, DropdownButton, Dropdown, Form, Button, FormControl, InputGroup, Image,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import './header.scss';

const Header = ({
  isLoggedIn,
  handleLogout,
  nickname,
  profilePhoto,
  id,
  search,
  changeSearchField,
  handleSearch
}) => {
  const handleClick = () => {
    handleLogout();
  };
  return (
    <Navbar className="Navbar" sticky="top" collapseOnSelect expand="lg" bg="light" variant="light">
      <LinkContainer to="/">
        <Navbar.Brand className="logo"><i className="fas fa-globe-americas">'rizons</i></Navbar.Brand>
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
        <Form 
          inline
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch(search);
          }}
        >
          <InputGroup>
            <FormControl 
              type="text" 
              placeholder="Recherche" 
              value={search}
              onChange={(e) => changeSearchField(e.target.value)}
              />
            <InputGroup.Append>
              <Button type='submit' variant="primary"><i className="fas fa-search" /></Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
        <Nav className="profile">
          {isLoggedIn
            ? (
              <>
                <Image className="profile_photo m-2" src={profilePhoto} roundedCircle />
                <DropdownButton
                  title={nickname}
                  id="dropdown-menu-align-right"
                  menuAlign="right"
                >
                  <LinkContainer to={`/profil/${id}`}>
                    <Nav.Link>Mon profil</Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/compte">
                    <Nav.Link>Paramètres du compte</Nav.Link>
                  </LinkContainer>

                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleClick}><i className="fas fa-sign-out-alt" />Se déconnecter</Dropdown.Item>
                </DropdownButton>
              </>
            )
            : (
              <>
                <LinkContainer to="/connexion">
                  <Nav.Link>Se connecter</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/inscription">
                  <Nav.Link>S'inscrire</Nav.Link>
                </LinkContainer>
              </>
            )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
  nickname: PropTypes.string.isRequired,
  profilePhoto: PropTypes.string,
  id: PropTypes.number.isRequired,
};

Header.defaultProps = {
  profilePhoto: 'https://media.fabfab.net/images/products/popup/cotton-poplin-plain-white--15_10005_001.jpg',
};

export default Header;
