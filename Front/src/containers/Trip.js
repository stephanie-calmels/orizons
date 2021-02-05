import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Trip from 'src/components/Trip';
import { getTrip, updateTrip, deleteTrip, updateStep, deleteStep } from '../actions/trip';

const mapStateToProps = (state, ownProps) => ({
  tripIdFromUrl: ownProps.match.params.id,
  trip: state.trip.tripItem,
  connectedUserId: state.member.id,
  categoriesList: state.trips.categories,
  countries: state.countries.countries
});

const mapDispatchToProps = (dispatch) => ({
  loadTrip: (id) => {
    dispatch(getTrip(id));
  },
  editTrip: (data) => {
    dispatch(updateTrip(data));
  },
  deleteTrip: () => {
    dispatch(deleteTrip());
  },
  editStep: (data, id) => {
    dispatch(updateStep(data, id));
  },
  deleteStep: (id, tripid) => {
    dispatch(deleteStep(id, tripid));
  }
});
// grace au hoc connect, j'enrichis mon composant avec des props liées au state
const container = connect(mapStateToProps, mapDispatchToProps)(Trip);

// grace au hoc withRouter, j'enrichis mon composant avec des props liées au router
const containerWithRouter = withRouter(container);

// HoC = couches d'oignons
// une couche withRouter... une couche connect... une couche présentation

// on exporte le tout
export default containerWithRouter;
