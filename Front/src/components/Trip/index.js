import React from 'react';

import './trip.scss';

import trips from 'src/data/trips';

import Banner from './Banner';
import Description from './Description';
import AddStep from './AddStep';


const Trip = ()=>{
  
const trip = trips[0]
 return <div>
  <Banner author={trip.author} picture={trip.cover_photo} title={trip.title}/>
  <Description trip={trip} />
  <AddStep />
  </div>
}


export default Trip;
