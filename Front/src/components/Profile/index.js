import React, { useEffect } from 'react';

import ProfileBanner from './ProfileBanner';
import ProfileInfos from './ProfileInfos';

const Profile = ({ profile, loadProfile, profileIdFromUrl }) => {
  useEffect(() => {
    loadProfile(profileIdFromUrl);
  }, []);
  // console.log(profile);
  return (
    <div>
      {profile && (
      <div>
        <ProfileBanner member={profile} />
        <ProfileInfos member={profile} trips={profile.trips} />
      </div>
      )}
    </div>
  );
};

export default Profile;
