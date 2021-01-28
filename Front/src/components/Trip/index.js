import React, {useEffect} from 'react';

import './trip.scss';

import trips from 'src/data/trips';

import Banner from './Banner';
import Description from './Description';
import AddStep from 'src/containers/AddStep';

const Trip = ({trip, loadTrip, tripIdFromUrl})=>{
console.log(tripIdFromUrl)
  useEffect(()=>{
    loadTrip(tripIdFromUrl)
  });

 return <div>
  <Banner author={trip.author} picture={trip.cover_photo} title={trip.title}/>
  <Description trip={trip} />
  <AddStep />
  </div>
}

export default Trip;
