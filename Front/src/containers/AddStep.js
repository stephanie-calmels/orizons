import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

import AddStep from 'src/components/Trip/AddStep';
import {changeAddStepField, postNewStep} from 'src/actions/addStep'

const mapStateToProps = (state) => ({
  title: state.addStep.title,
  summary: state.addStep.summary,
  localisation: state.addStep.localisation,
  localisationInput: state.addStep.localisationInput,
  showInput: state.addStep.showInput,
  date: state.addStep.date,
  pictures: state.addStep.coverpicture,
  country: state.addStep.country,
  country_code: state.addStep.country_code
});

const mapDispatchToProps = (dispatch)=>({
  changeField: (name, value)=>{dispatch(changeAddStepField(name,value))},
  postStep: (data)=>{dispatch(postNewStep(data))},
})
// grace au hoc connect, j'enrichis mon composant avec des props liées au state
const container = connect(mapStateToProps, mapDispatchToProps)(AddStep);

// grace au hoc withRouter, j'enrichis mon composant avec des props liées au router
const containerWithRouter = withRouter(container);

// HoC = couches d'oignons
// une couche withRouter... une couche connect... une couche présentation

// on exporte le tout
export default containerWithRouter;
