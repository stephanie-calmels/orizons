import React from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Title from '../PageTitle';
import './about.scss'

const About = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Kamil",
      title: "Product Owner",
      photo: "https://ca.slack-edge.com/T018S94MBUY-U018XGBSWDP-d41d27ad106a-512",
    },
    {
      id: 2,
      name: "Juliette",
      title: "Scrum Master",
      photo: "https://ca.slack-edge.com/T018S94MBUY-U01846K5SG7-f25fc70a8b26-512",
    },
    {
      id: 3,
      name: "Stéphanie",
      title: "Git Master",
      photo: "https://ca.slack-edge.com/T018S94MBUY-U0198NZKVT2-5e789b566ecb-512",
    },
    {
      id: 4,
      name: "Armandine",
      title: "Lead Back",
      photo: "https://ca.slack-edge.com/T018S94MBUY-U018R2G9V60-f3e12639031e-512",
    },
    {
      id: 5,
      name: "Paul",
      title: "Lead Front",
      photo: "https://ca.slack-edge.com/T018S94MBUY-U01FWGGJ1S5-618ba15e20dd-512",
    },
  ]

  return (
  <div className="about">
    <Title texte="L'équipe O'rizons" />
      {/* <p>Une envie de conserver vos souvenirs ? 
      De partager vos expériences sans vous encombrez d'une diversité d'outils numériques ? O'rizons vous permet de publier, explorer et partager un carnet de voyage connecté.</p>
     */}

    <CardDeck className="members">
    {teamMembers.map(member => (
      <Card key={member.id} className="members-card">
        <Card.Img className="img members-img" variant="top" src={member.photo} alt={member.name}></Card.Img>
          <Card.Body>
            <Card.Title className="members-card-name">{member.name}</Card.Title>
            <Card.Text className="members-card-title">{member.title}</Card.Text>
          </Card.Body>
        </Card>
    ))}
         
    </CardDeck>
      <p className="h4 font-weight-bold text-center mt-5">Site réalisé avec <i class="em em-heart" /> et beaucoup de <i class="em em-coffee"/> ! </p>
      <p className="h5 text-center">Merci à <span className="font-weight-bold">O'Clock</span> - Formation développeur web en direct et à distance - Promotion Lyra JS</p>
  </div>
  )
};

export default About;
