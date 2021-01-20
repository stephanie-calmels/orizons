import React from 'react';


import ProfileBanner from 'src/components/ProfileBanner';
import ProfileInfos from 'src/components/ProfileInfos';
import ProfileTrips from 'src/components/ProfileTrips';

import members from 'src/data/members'

const Profile = () => {
  const member = members[0];
  console.log(member)
  return <div>
    <ProfileBanner member={member}/>
    <ProfileInfos member={member}/>
    <ProfileTrips member={member}/>
    </div>
};

export default Profile;
