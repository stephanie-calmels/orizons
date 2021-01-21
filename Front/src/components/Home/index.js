import React from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { LinkContainer} from 'react-router-bootstrap';
import { useLayoutEffect, useState } from "react";

import './home.scss'

function useMediaQuery() {
  const [screenSize, setScreenSize] = useState([0, 0]);
  
  useLayoutEffect(() => {
    function updateScreenSize() {
      setScreenSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateScreenSize);
    updateScreenSize();
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);
  
  return screenSize;
}


const Home = ({ isLogged }) => {
  const [width] = useMediaQuery();
  return width > 769 ? (
    <Container fluid>
      <Row>
          <Card className="text-white home_banner">
            <Card.Img src="https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" className="home_banner-image" />
            <Card.ImgOverlay className="home_banner-overlay">
              <Card.Title className="home_banner-title">"Voyager vous laisse d'abord sans voix, avant de vous transformer en conteur" - Ibn Battuta
              </Card.Title>
              <Card className="home_banner-card">
                <Card.Text>
                O'rizons met à votre disposition tous les outils nécessaires pour raconter votre voyage, comme bon vous semble.
                </Card.Text>
                <Card.Text>
                Vous souhaitez partager votre expérience avec vos proches, inspirer d'autres voyageurs à marcher dans vos pas ou simplement conserver une trace de votre dernière aventure ?
                </Card.Text>

                {
                  isLogged ?
                  <LinkContainer to="/ajouter-carnet">
                    <Button className="home_banner-card-btn">Créez votre carnet de voyage</Button>
                  </LinkContainer>
                  :
                  <LinkContainer to="/inscription">
                    <Button className="home_banner-card-btn">Créez votre carnet de voyage</Button>
                  </LinkContainer>
                }
                
              </Card>
            </Card.ImgOverlay>
          </Card>
      </Row>

      <Row>
        <Col>
          
        </Col>
      </Row>
      

    </Container>
  ) : (
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
                  isLogged ?
                  <LinkContainer to="/ajouter-carnet">
                    <Button className="home_banner-card-btn">Créez votre carnet de voyage</Button>
                  </LinkContainer>
                  :
                  <LinkContainer to="/inscription">
                    <Button className="home_banner-card-btn">Créez votre carnet de voyage</Button>
                  </LinkContainer>
                }
                
              </Card.ImgOverlay>
              
          </Card>
      </Row>

      <Row>
          <Carousel touch='true'>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://images.pexels.com/photos/1646981/pexels-photo-1646981.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt="First slide"
              />
              <Carousel.Caption className="carousel-caption-text" >
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
                <p>Suivez les aventures de vos voyaheurs favoris !</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
      </Row>
      

    </Container>
  );
};

export default Home;
