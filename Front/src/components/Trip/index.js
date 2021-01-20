import React from 'react';

import './trip.scss';

import trips from 'src/data/trips';

import Banner from 'src/components/Banner';
import Description from 'src/components/Description';



const Trip = ()=>{
  
const trip = trips[0]
 
 return <div>
  <Banner author={trip.author} picture={trip.cover_photo} title={trip.title}/>
  <Description trip={trip} />
  
  </div>
}


export default Trip;
