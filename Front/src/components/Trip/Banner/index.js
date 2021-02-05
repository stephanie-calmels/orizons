import React from 'react';
import { Image } from 'react-bootstrap';

import './banner.scss';

const Banner = ({ author, picture, title }) => {
  // console.log(picture)
  const styles = {
    backgroundImage: `url(${picture})`,
    height: '60vh',
    width: '100vw',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
  return (
    <div style={styles} className="cover-trip-container">
      <h2>{title}</h2>
      <div className="author-profile-trip">
        <Image src={author.profile_photo} className="author-profile-trip-pic" roundedCircle />
        <p>{author.nickname}</p>
      </div>
    </div>
  );
};

export default Banner;
