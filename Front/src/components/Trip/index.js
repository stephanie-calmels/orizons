import React, {useEffect} from 'react';

import './trip.scss';


import Banner from './Banner';
import Description from './Description';
import AddStep from 'src/containers/AddStep';

const Trip = ({trip, loadTrip, tripIdFromUrl})=>{

  useEffect(()=>{
    loadTrip(tripIdFromUrl)
  },[]);
 return <div>
  {trip && <div>
  <Banner author={trip.trip.author[0]} picture={trip.trip.cover_trip} title={trip.trip.title}/>
  <Description trip={trip.trip} steps={trip.steps}/>
  <AddStep tripId={tripIdFromUrl}/>
  </div>}
  </div>
}

export default Trip;
