import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';

import {getTripBySlug} from 'src/utils/getTripBySlug';

import Trip from 'src/components/Trip';
// import des actions
// import {
  
// } from '../actions/';

const mapStateToProps = (state, ownProps) => ({
  // on récupère le trip selon le slug
  // state.trips.list = tableau des trips dans notre store
  // ownProps.match.params.slug = la valeur du parametre "slug" dans l'url
  // ownProps = toutes les props que l'on récupère
  // toutes les props sauf celles que l'on fabrique dans mapStateToProps/mapDispatchToProps
  // ce qui veut dire, que on peut accéder aux props de withRouter avec ownProps
  trip: getTripBySlug(state.trips, ownProps.match.params.slug),
});

// grace au hoc connect, j'enrichis mon composant avec des props liées au state
const container = connect(mapStateToProps)(Trip);

// grace au hoc withRouter, j'enrichis mon composant avec des props liées au router
const containerWithRouter = withRouter(container);

// HoC = couches d'oignons
// une couche withRouter... une couche connect... une couche présentation

// on exporte le tout
export default containerWithRouter;
