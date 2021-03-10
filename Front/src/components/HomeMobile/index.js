import React from 'react';
import PropTypes from 'prop-types';

import {
  Container, Row, Card, Button, Carousel, Image,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import anonyme from 'src/assets/user-icon-2098873_640.png';

import './homeMobile.scss';

const HomeMobile = ({ isLoggedIn, randomTrips, handleClick }) => (
  <Container fluid>
    <Row>
      <Card className="text-white home_banner-mobile">
        <Card.Img src="https://1.bp.blogspot.com/-kMoVqZpdljw/X9NlNNN4ZOI/AAAAAAAAOVY/JSBsT8efWt8v5ICjTA2pgQrG4RjA9jX6ACLcBGAsYHQ/s0/Apple-iPhone-XS-Max-Wallpapers-23.jpeg" className="home_banner-image" />
        <Card.ImgOverlay className="home_banner-mobile-overlay">
          <Card.Title className="home_banner-mobile-title">"Voyager vous laisse d'abord sans voix, avant de vous transformer en conteur" - Ibn Battuta
          </Card.Title>
          <LinkContainer to="/exploration">
            <Button className="home_banner-mobile-card-btn">
              Découvrez les carnets d'autres voyageurs
            </Button>
          </LinkContainer>
          {
            isLoggedIn
              ? (
                <LinkContainer to="/ajouter-carnet">
                  <Button className="home_banner-mobile-card-btn">
                    Créez votre carnet de voyage
                  </Button>
                </LinkContainer>
              )
              : (
                <LinkContainer to="/inscription">
                  <Button className="home_banner-mobile-card-btn">
                    Créez votre carnet de voyage
                  </Button>
                </LinkContainer>
              )
          }
        </Card.ImgOverlay>

      </Card>
    </Row>

    <Row>
      <h4 className="carousel-title">Pourquoi choisir O'rizons ?</h4>
      <Carousel touch>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://media.discordapp.net/attachments/356888374092627968/806898627217063986/pexels-pixabay-163034.jpg?width=963&height=630"
            alt="First slide"
          />
          <Carousel.Caption className="carousel-caption-text">
            <h3>Des carnets de voyage à votre image</h3>
            <p>Organisez votre carnet grâce à des outils faciles d'utilisation</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://media.discordapp.net/attachments/356888374092627968/806898627912925204/pexels-leah-kelley-185933.jpg?width=963&height=630"
            alt="Second slide"
          />

          <Carousel.Caption className="carousel-caption-text">
            <h3>Une carte interactive</h3>
            <p>qui évolue au fil de vos pérégrinations</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://media.discordapp.net/attachments/356888374092627968/806898626403500102/pexels-photo-3280130.jpeg?width=963&height=630"
            alt="Third slide"
          />
          <Carousel.Caption className="carousel-caption-text">
            <h3>Une communauté de voyageurs</h3>
            <p>Suivez les aventures de vos voyageurs favoris !</p>
          </Carousel.Caption>
        </Carousel.Item>

      </Carousel>

    </Row>

    <Row>
      <h4 className="carousel-title">En manque d'inspiration ?</h4>
      <Carousel touch>
        {
          randomTrips.map((trip) => (
            <Carousel.Item key={trip.id}>
              <div onClick={() => handleClick(trip.id)}>
                <img
                  className="d-block w-100"
                  src={trip.cover_trip}
                  alt={trip.title}
                />
                <Carousel.Caption className="carousel-caption-text">
                  <h3>{trip.title}</h3>
                  <p>by {trip.author[0].nickname}</p>
                </Carousel.Caption>
              </div>
            </Carousel.Item>
          ))
        }
      </Carousel>
    </Row>

    <Row>
      <h4 className="carousel-title">O'rizons, ce sont nos voyageurs qui en parlent le mieux !</h4>
      <Carousel className="comments_carousel" touch>

        <Carousel.Item>
          <Card className="card_comment-mobile">
            <Card.Header>
              <Image className="profile_photo m-2" src={anonyme} roundedCircle />
              <small className="text-muted">Kamil</small>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                C'est trop cool !
              </Card.Text>
            </Card.Body>
          </Card>
        </Carousel.Item>

        <Carousel.Item>
          <Card className="card_comment-mobile">
            <Card.Header>
              <Image className="profile_photo m-2" src={anonyme} roundedCircle />
              <small className="text-muted">Paul</small>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                J'adore partager mes voyages, et O'rizons est le meilleur site que je connaisse pour le faire !
              </Card.Text>
            </Card.Body>
          </Card>
        </Carousel.Item>

        <Carousel.Item>
          <Card className="card_comment-mobile">
            <Card.Header>
              <Image className="profile_photo m-2" src={anonyme} roundedCircle />
              <small className="text-muted">Juliette</small>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                Super design, pratique à utiliser. C'est top !
              </Card.Text>
            </Card.Body>
          </Card>
        </Carousel.Item>

        <Carousel.Item>
          <Card className="card_comment-mobile">
            <Card.Header>
              <Image className="profile_photo m-2" src={anonyme} roundedCircle />
              <small className="text-muted">Armandine</small>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                La version mobile est super pratique pour partager ses aventures au jour le jour.
              </Card.Text>
            </Card.Body>
          </Card>
        </Carousel.Item>

      </Carousel>
    </Row>

  </Container>
);

HomeMobile.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired, 
  randomTrips: PropTypes.arrayOf(PropTypes.object).isRequired, 
  handleClick: PropTypes.func.isRequired, 
};

export default HomeMobile;
