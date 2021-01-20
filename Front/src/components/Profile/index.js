import React from 'react';


import ProfileBanner from 'src/components/ProfileBanner';
import ProfileInfos from 'src/components/ProfileInfos';

import members from 'src/data/members'
import trips from 'src/data/trips'
const Profile = () => {
  const member = members[0];
  return <div>
    <ProfileBanner member={member}/>
    <ProfileInfos member={member} trips={trips} />
    </div>
};

export default Profile;
