import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

import AddTrip from 'src/components/AddTrip';
import {changeAddTripField, postNewTrip} from 'src/actions/addTrip'

const mapStateToProps = (state) => ({
  title: state.addTrip.title,
  summary: state.addTrip.summary,
  localisation: state.addTrip.localisation,
  categories: state.addTrip.categories,
  departure: state.addTrip.departure,
  returndate: state.addTrip.returndate,
  coverpicture: state.addTrip.coverpicture,
  categoriesList: state.trips.categories,
  country_code: state.addTrip.country_code
});

const mapDispatchToProps = (dispatch)=>({
  changeField: (name, value)=>{dispatch(changeAddTripField(name,value))},
  postTrip: (data)=>{dispatch(postNewTrip(data))},
})
// grace au hoc connect, j'enrichis mon composant avec des props liées au state
const container = connect(mapStateToProps, mapDispatchToProps)(AddTrip);

// grace au hoc withRouter, j'enrichis mon composant avec des props liées au router
const containerWithRouter = withRouter(container);

// HoC = couches d'oignons
// une couche withRouter... une couche connect... une couche présentation

// on exporte le tout
export default containerWithRouter;
