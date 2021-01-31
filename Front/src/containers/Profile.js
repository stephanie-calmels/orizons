import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Profile from 'src/components/Profile';
import { getProfile, updateProfile } from '../actions/profile';

const mapStateToProps = (state, ownProps) => ({
  profile: state.profile.profileInfos,
  profileIdFromUrl: ownProps.match.params.id,
  connectedUserId: state.member.id
});

const mapDispatchToProps = (dispatch) => ({
  loadProfile: (id) => {
    dispatch(getProfile(id));
  },
  editProfile: (data)=>{
    dispatch(updateProfile(data))
  }
});
// grace au hoc connect, j'enrichis mon composant avec des props liées au state
const container = connect(mapStateToProps, mapDispatchToProps)(Profile);

// grace au hoc withRouter, j'enrichis mon composant avec des props liées au router
const containerWithRouter = withRouter(container);

// HoC = couches d'oignons
// une couche withRouter... une couche connect... une couche présentation

// on exporte le tout
export default containerWithRouter;
