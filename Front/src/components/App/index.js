// == Import npm
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// == Import
import './styles.scss';

import 'bootstrap/dist/css/bootstrap.min.css';

// Importing Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from 'src/containers/Header'; // REDUX
import Login from 'src/containers/Login'; // REDUX
import Register from 'src/containers/Register'; // REDUX
import Page from 'src/components/Page';
import Home from 'src/components/Home';
import Trips from 'src/components/Trips';
import AddTrip from 'src/components/AddTrip';
import Profile from 'src/components/Profile';
import Account from 'src/components/Account';

import Trip from 'src/components/Trip';

// == Dumb Components
import Footer from 'src/components/Footer';
import About from 'src/components/About';
import Legals from 'src/components/Legals';
import ContactForm from 'src/components/ContactForm';

// == Import 'Fake data'
import trips from 'src/data/trips';
import categories from 'src/data/categories';

// == Composant

const App = ({ isLoggedIn, role, nickname }) => (
  <div>
    <Header isLoggedIn={isLoggedIn} />
    <ToastContainer 
      position="bottom-right"
    />
    <Page>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/inscription">
        {/* { isLoggedIn ? <Redirect to={`profil/${nickname}`}/> : <Register /> } */}
          <Register />
        </Route>
        <Route exact path="/connexion">
          {/* { isLoggedIn ? <Redirect to={`profil/${nickname}`}/> : <Login /> } */}
          <Login />
        </Route>
        <Route exact path="/contact">
          <ContactForm />
        </Route>
        <Route exact path="/a-propos">
          <About />
        </Route>
        <Route exact path="/mentions-legales">
          <Legals />
        </Route>
        <Route exact path="/exploration">
          <Trips trips={trips} categories={categories}/>
        </Route>
        <Route exact path="/exploration/:slug">
          <Trip />
        </Route>
        <Route exact path="/profil/:pseudo">
          <Profile />
        </Route>
        <Route exact path="/ajouter-carnet">
          { isLoggedIn ? <AddTrip /> : <Redirect to="/connexion" />}
        </Route>
        {/* <Route exact path="/ajouter-etape">
          <AddStep />
          </Route> */}
        
        {/* PAGES ACCESSIBLES PAR L'UTILISATEUR IDENTIFIE */}
        // TODO: comment on fait ça ???
        <Route exact path="/compte">
        { isLoggedIn ? <Account /> : <Redirect to="/" />}
        </Route>
      </Switch>
    </Page>
    <Footer />
  </div>
);

// == Export
export default App;
