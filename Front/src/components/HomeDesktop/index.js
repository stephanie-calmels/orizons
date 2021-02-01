import React, { useEffect } from 'react';
import {
  Container, Row, Col, Card, Button, Carousel, Badge, CardDeck, Image, Form, InputGroup
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import anonyme from 'src/assets/user-icon-2098873_640.png';

import './homeDesktop.scss';

const HomeDesktop = ({
  isLoggedIn, randomTrips, categories, randomSearch, handleClick, loadCategories, changeCategoryField, searchByCategory, category_search, loadCountries, countries, country_search, changeCountryField, searchByCountry
}) => {
  useEffect(() => {
    loadCategories();
    loadCountries();
  }, []);

  return (
  <Container fluid>
    <Row>
      <Card className="text-white home_banner">
        <Card.Img src="https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg" className="home_banner-image" />
        <Card.ImgOverlay className="home_banner-overlay">
          <Card.Title className="home_banner-title">"Voyager vous laisse d'abord sans voix, avant de vous transformer en conteur." <br />
            Ibn Battuta
          </Card.Title>
          <Card className="home_banner-card">
            <Card.Text>
              O'rizons met à votre disposition tous les outils nécessaires pour raconter votre voyage, comme bon vous semble.
            </Card.Text>
            <Card.Text>
              Vous souhaitez partager votre expérience avec vos proches, inspirer d'autres voyageurs à marcher dans vos pas ou simplement conserver une trace de votre dernière aventure ?
            </Card.Text>

            {
                isLoggedIn
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

          </Card>
        </Card.ImgOverlay>
      </Card>
    </Row>

    <Row>
      <h4 className="row-title">O'rizons, qu'est-ce que c'est ?</h4>
    </Row>

    <Row>
      <Col>
        <Card className="card_benefits">
          <Card.Img className="card_benefits-image" src="https://images.pexels.com/photos/1646981/pexels-photo-1646981.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
          <Card.Body className="card_benefits-body">
            <Card.Title className="card_benefits-title">Des carnets de voyage à votre image</Card.Title>
            <Card.Text className="card_benefits-text">
              Vous êtes du genre à écrire des romans à chaque étape de votre voyage ? Vous préférez laisser vos photos parler pour vous ? Avec O'rizons, vous êtes seul maître à bord et organisez votre carnet comme bon vous semble grâce à des outils faciles d'utilisation qui s'adaptent à vos besoins.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>

    <Row>
      <Col>
        <Card className="card_benefits-revert">
          <Card.Img className="card_benefits-image" src="https://images.pexels.com/photos/68704/pexels-photo-68704.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
          <Card.Body className="card_benefits-revert-body">
            <Card.Title className="card_benefits-title">Une carte interactive, qui évolue au fil de vos pérégrinations</Card.Title>
            <Card.Text className="card_benefits-text">
              Que vous partiez pour plusieurs mois ou seulement pour un week-end, gardez une trace de vos aventures grâce à notre carte qui se met à jour à chaque nouvelle étape de votre voyage. Avec notre outil de géolocalisation, tenez à jour votre carnet en temps réel, depuis vote smartphone.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>

    <Row>
      <Col>
        <Card className="card_benefits">
          <Card.Img className="card_benefits-image" src="https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
          <Card.Body className="card_benefits-body">
            <Card.Title className="card_benefits-title">Une communauté de voyageurs qui partagent leurs expériences</Card.Title>
            <Card.Text className="card_benefits-text">
              Découvrez les carnets de voyageurs venus d'horizons différents et, qui sait, vous trouverez peut-être une idée pour votre prochain week-end en famille ou pour votre voyages de noces. Suivez les aventures de vos voyageurs favoris et apportez-leur votre soutien en commentant leurs publications !
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>

    <Row>
      <h4 className="row-title">En manque d'inspiration ?</h4>
    </Row>

    <Row>
      <Col md={6}>
        <h5 className="col-title">Découvrez notre sélection de carnets publiés par la communauté O'rizons</h5>
        <CardDeck>
          {randomTrips.map((trip) => (
            <Col md={6} key={trip.id}>
              <div onClick={() => handleClick(trip.id)} style={{cursor: 'pointer'}}>
                <Card className="card_home">
                  <Card.Img className="card_home-img-top" variant="top" src={trip.cover_trip} />
                  <Card.Body className="card_home-body">
                    <Card.Title className="card_home-title">{trip.title}</Card.Title>
                    <Card.Text className="card_home-text">
                      {trip.summary}
                    </Card.Text>
                    <Card.Text className="card_home-text">
                      {trip.categories.map((category) => (

                        <Badge pill key={category.id} className="tag" style={{ backgroundColor: `${category.color}` }}>
                          {category.entitled}
                        </Badge>
                      ))}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="card_home-footer">
                    <Image className="profile_photo m-2" src={trip.author[0].profile_photo} roundedCircle />
                    <small className="text-muted">{trip.author[0].nickname}</small>
                  </Card.Footer>
                </Card>
              </div>
            </Col>
          ))}
        </CardDeck>
      </Col>

      <Col className="search_box" md={6}>
        <h5 className="col-title">Vous recherchez quelque chose en particulier ? Parcourez les carnets de voyage publiés sur O'rizons, triés par pays, ville ou catégorie.</h5>
        <Container className='form_container'>
          <Form 
            className="form_search" 
            onSubmit={(e) => {
              e.preventDefault();
              searchByCountry(country_search);
              }}>
            <Form.Group as={Row} controlId="formGroupCountry">
              <Form.Label column sm={4}>Pays</Form.Label>
              <Col sm={6}>
                <InputGroup>
                  <Form.Control 
                    as="select" 
                    onChange={(e) => changeCountryField(e.target.value)}
                    name="country_search"
                    value={country_search}
                  >
                    {
                      countries.map((country) => (
                        <option key={country.id} value={country.code}>{country.fr_name}</option>
                      ))
                    }
                  </Form.Control>
                  <InputGroup.Append>
                    <Button 
                      type='submit'
                      variant="primary"
                    >
                      <i className="fas fa-search" />
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </Col>
            </Form.Group>
          </Form>

          {/* <Form className="form_search">
            <Form.Group as={Row} controlId="formGroupCity">
              <Form.Label column sm={4}>Ville</Form.Label>
              <Col sm={6}>
                <InputGroup>
                  <Form.Control 
                    type="city" 
                    placeholder="Rechercher par ville" 
                  />
                  <InputGroup.Append>
                    <Button variant="primary"><i className="fas fa-search" /></Button>
                  </InputGroup.Append>
                </InputGroup>
              </Col>
            </Form.Group>
          </Form>
 */}
          <Form 
            className="form_search" 
            onSubmit={(e) => {
              e.preventDefault();
              searchByCategory(category_search);
              }}>
            <Form.Group as={Row} controlId="formGroupCategory">
              <Form.Label column sm={4}>Type de voyage</Form.Label>
              <Col sm={6}>
                <InputGroup>
                  <Form.Control 
                    as="select" 
                    onChange={(e) => changeCategoryField(e.target.value)}
                    name="category_search"
                    value={category_search}
                  >
                    {
                      categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.entitled}</option>
                      ))
                    }
                  </Form.Control>
                  <InputGroup.Append>
                    <Button 
                      type='submit'
                      variant="primary"
                    >
                      <i className="fas fa-search" />
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </Col>
            </Form.Group>
          </Form>
        </Container>
        

        <h5 className="col-title">Vous préférez vous faire surprendre ?</h5>
        <Button className="random_search-button" onClick={randomSearch}>Voir un carnet de voyage au hasard</Button>

        <blockquote className="blockquote">"Le plus beau moment de la vie humaine est un départ vers des terres inconnues." <br />
          Sir Richard Burton
        </blockquote>

      </Col>
    </Row>

    <Row>
      <h4 className="row-title">O'rizons, ce sont nos voyageurs qui en parlent le mieux !</h4>
    </Row>

    <Row>
      <Col>
        <Carousel touch>

          <Carousel.Item>
            <CardDeck>
              <Col md={3}>
                <Card>
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
              </Col>
              <Col md={3}>
                <Card>
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
              </Col>
              <Col md={3}>
                <Card>
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
              </Col>
              <Col md={3}>
                <Card>
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
              </Col>
            </CardDeck>

          </Carousel.Item>

          <Carousel.Item>
            <CardDeck>
              <Col md={3}>
                <Card>
                  <Card.Header>
                    <Image className="profile_photo m-2" src={anonyme} roundedCircle />
                    <small className="text-muted">Charles</small>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      J'adore !
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card>
                  <Card.Header>
                    <Image className="profile_photo m-2" src={anonyme} roundedCircle />
                    <small className="text-muted">Chris</small>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      Le meilleur site de carnet de voyage que je connaisse !
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card>
                  <Card.Header>
                    <Image className="profile_photo m-2" src={anonyme} roundedCircle />
                    <small className="text-muted">Nono</small>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      Ca donne envie de voyager xD
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card>
                  <Card.Header>
                    <Image className="profile_photo m-2" src={anonyme} roundedCircle />
                    <small className="text-muted">JD</small>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      Super site !
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </CardDeck>
          </Carousel.Item>

        </Carousel>
      </Col>
    </Row>

  </Container>
)};

export default HomeDesktop;
