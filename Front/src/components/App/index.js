// == Import npm
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// == Import
import './styles.scss';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Page from 'src/components/Page';
import Home from 'src/components/Home';
import Trips from 'src/components/Trips';
import AddTrip from 'src/components/AddTrip';
import Profile from 'src/components/Profile';
import Account from 'src/components/Account';
import Subscribe from 'src/components/Subscribe';
import Connect from 'src/components/Connect';
import ContactForm from 'src/components/ContactForm';
import About from 'src/components/About';
import Legals from 'src/components/Legals';


// == Composant
const App = () => {
  return <div>
    <Header isLogged={false} />
    <Page>
    <Switch>
      <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/exploration">
          <Trips />
        </Route>
        {/* <Route exact path="/exploration/:slug">
          <Trip />
        </Route> */}
        <Route exact path="/ajouter-carnet">
          <AddTrip />
        </Route>
        {/* <Route exact path="/ajouter-etape">
          <AddStep />
        </Route> */}

        <Route exact path="/inscription">
          <Subscribe />
        </Route>
        <Route exact path="/connexion">
          <Connect />
        </Route>
        <Route exact path="/contact">
          <ContactForm />
        </Route>
        <Route exact path="/a-propos">
          <About />
        </Route>
        <Route exact path="/compte">
          <Account />
        </Route>
        <Route exact path="/mentions-legales">
          <Legals />
        </Route>
        <Route exact path="/profile/:pseudo">
          <Profile />
        </Route>
    </Switch>
      
    </Page>
   
    <Footer /> 
  </div>

};

// == Export
export default App;
