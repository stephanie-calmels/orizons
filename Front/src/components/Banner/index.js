import React from 'react';
import {Image} from 'react-bootstrap'

import './styles.scss'
 
const Banner = ({author, picture, title})=>{
  
  const styles = {
    backgroundImage: `url(${picture.url})`,
    height: '20vh',
    width: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }
    return <div>
    <div style={styles}>
    <h1>{title}</h1>
    <Image src={author.profile_photo.url} className='author-profile-pic'/>
    <p>{author.nickname}</p>
    </div>
    
    </div>
  }

export default Banner
