import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
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
        <Col>
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
        </Col>
      </Row>

      <Row>
        <Col>
          
        </Col>
      </Row>
      

    </Container>
  ) : (
    <Container fluid>
      <Row>
        <Col>
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
        </Col>
      </Row>

      <Row>
        <Col>
          
        </Col>
      </Row>
      

    </Container>
  );
};

export default Home;
