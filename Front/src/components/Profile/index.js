import React, { useEffect } from 'react';
import {Button} from 'react-bootstrap';

import ProfileBanner from './ProfileBanner';
import ProfileInfos from './ProfileInfos';

import './profile.scss'

const Profile = ({ profile, loadProfile, profileIdFromUrl, connectedUserId }) => {
  useEffect(() => {
    loadProfile(profileIdFromUrl);
  }, []);
  // console.log(profile);
  return (
    <div>

      {profile && (
      <div>
        <ProfileBanner member={profile} />
        {profileIdFromUrl == connectedUserId && <Button className="edit-profile-button">Editer mon profil</Button>}
        <ProfileInfos member={profile} trips={profile.trips} />
      </div>
      )}
    </div>
  );
};

export default Profile;
