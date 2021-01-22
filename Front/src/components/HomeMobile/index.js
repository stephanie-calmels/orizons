import React from 'react';
import {
  Container, Row, Card, Button, Carousel,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import './homeMobile.scss';

const HomeMobile = ({ isLogged, trips }) => (
  <Container fluid>
    <Row>
      <Card className="text-white home_banner">
        <Card.Img src="https://images.pexels.com/photos/3464632/pexels-photo-3464632.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" className="home_banner-image" />
        <Card.ImgOverlay className="home_banner-overlay">
          <Card.Title className="home_banner-title">"Voyager vous laisse d'abord sans voix, avant de vous transformer en conteur" - Ibn Battuta
          </Card.Title>
          <LinkContainer to="/exploration">
            <Button className="home_banner-card-btn">Découvrez les carnets d'autres voyageurs</Button>
          </LinkContainer>
          {
                isLogged
                  ? (
                    <LinkContainer to="/ajouter-carnet">
                      <Button className="home_banner-card-btn">Créez votre carnet de voyage</Button>
                    </LinkContainer>
                  )
                  : (
                    <LinkContainer to="/inscription">
                      <Button className="home_banner-card-btn">Créez votre carnet de voyage</Button>
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
            src="https://images.pexels.com/photos/1646981/pexels-photo-1646981.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
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
            src="https://images.pexels.com/photos/68704/pexels-photo-68704.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
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
            src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
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
            trips.map((trip) => (
              <Carousel.Item key={trip.id}>
                <img
                  className="d-block w-100"
                  src={trip.cover_photo.url}
                  alt={trip.title}
                />
                <Carousel.Caption className="carousel-caption-text">
                  <h3>{trip.title}</h3>
                  <p>by {trip.author.nickname}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))
          }
      </Carousel>
    </Row>

    <Row>
      <h4 className="carousel-title">O'rizons, ce sont nos voyageurs qui en parlent le mieux</h4>
      <Carousel touch>
        {
            trips.map((trip) => (
              <Carousel.Item key={trip.id}>
                <img
                  className="d-block w-100"
                  src={trip.cover_photo.url}
                  alt={trip.title}
                />
                <Carousel.Caption className="carousel-caption-text">
                  <h3>{trip.title}</h3>
                  <p>by {trip.author.nickname}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))
          }
      </Carousel>
    </Row>

  </Container>
);

export default HomeMobile;
