import { connect } from 'react-redux';
import history from '../history';

import HomeDesktop from 'src/components/HomeDesktop';
import {
  randomSearch, getCategories, changeCategoryField, getTripsByCategory, getTripsByCountry
} from '../actions/trips';
import { getCountries, changeCountryField } from '../actions/countries';

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
  randomTrips: state.trips.randomTrips,
  categories: state.trips.categories,
  category_search: state.trips.category_search,
  country_search: state.countries.country_search,
  countries: state.countries.countries
});

const mapDispatchToProps = (dispatch) => ({
  randomSearch: () => {
    dispatch(randomSearch());
  },
  handleClick: (id) => {
    history.push(`/exploration/${id}`);
  },
  loadCategories: () => {
    dispatch(getCategories());
  },
  changeCategoryField: (value) => {
    dispatch(changeCategoryField(value));
  },
  searchByCategory: (id) => {
    dispatch(getTripsByCategory(id));
    history.push(`/resultats`);
  },
  loadCountries: () => {
    dispatch(getCountries());
  },
  changeCountryField: (value) => {
    dispatch(changeCountryField(value));
  },
  searchByCountry: (code) => {
    dispatch(getTripsByCountry(code));
    history.push(`/resultats`);
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeDesktop);
