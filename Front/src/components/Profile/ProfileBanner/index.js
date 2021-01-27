import React from 'react';
import {Image} from 'react-bootstrap';

import './profileBanner.scss'
const ProfileBanner = ({member})=>{
  const styles = {
    backgroundImage: `url(${member.cover_photo.url})`,
    height: '20vh',
    width: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }

  let signupDate = new Date(member.registration_date);

    return <div style={styles} className="cover-container">
      <div className="author-profile">
        <Image src={member.profile_photo.url} className='author-profile-pic' rounded/>
        <h1>{member.nickname}</h1>
        <p>Membre depuis {signupDate.getFullYear()} <br /> {member.localisation}</p>
      </div>
    </div>
};

export default ProfileBanner;
