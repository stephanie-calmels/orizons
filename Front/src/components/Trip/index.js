import React, { useEffect } from 'react';

import './trip.scss';

import AddStep from 'src/containers/AddStep';
import Banner from './Banner';
import Description from './Description';

const Trip = ({ trip, loadTrip, tripIdFromUrl }) => {
  useEffect(() => {
    loadTrip(tripIdFromUrl);
  }, []);
  return (
    <div>
      {trip && (
      <div>
        <Banner
          author={trip.trip.author[0]}
          picture={trip.trip.cover_trip}
          title={trip.trip.title}
        />
        <Description trip={trip.trip} steps={trip.steps} />
        <AddStep />
      </div>
      )}
    </div>
  );
};

export default Trip;
