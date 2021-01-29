import React, { useEffect } from 'react';

import ProfileBanner from './ProfileBanner';
import ProfileInfos from './ProfileInfos';

import members from 'src/data/members';
import trips from 'src/data/trips';

const Profile = ({profile, loadProfile, profileIdFromUrl}) => {
 useEffect(()=>{
   loadProfile(profileIdFromUrl)
 },[])
 console.log(profile)
  return <div>
      {profile && <div>
      <ProfileBanner member={profile}/>
      <ProfileInfos member={profile} trips={profile.categories} />
      </div>}
    </div>
};

export default Profile;
