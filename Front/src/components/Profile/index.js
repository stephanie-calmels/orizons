import React, { useEffect } from 'react';

import ProfileBanner from './ProfileBanner';
import ProfileInfos from './ProfileInfos';

import members from 'src/data/members';
import trips from 'src/data/trips';

const Profile = ({profile, loadProfile}) => {
 useEffect(()=>{
   loadProfile(profile.id)
 },[])
  return (
    <div>
      <ProfileBanner member={profile}/>
      <ProfileInfos member={profile} trips={trips} />
    </div>
  );
};

export default Profile;
