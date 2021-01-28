import React from 'react';
import { Image } from 'react-bootstrap';

import './banner.scss';

const Banner = ({ author, picture, title }) => {
  console.log(picture)
  const styles = {
    backgroundImage: `url(${picture.url})`,
    height: '20vh',
    width: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
  return (
    <div style={styles} className="cover-container">
      <h1>{title}</h1>
      <Image src={author.profile_photo.url} className="author-profile-pic" roundedCircle />
      <p>{author.nickname}</p>
    </div>
  );
};

export default Banner;
