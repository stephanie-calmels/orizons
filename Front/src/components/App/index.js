// == Import npm
import React from 'react';

// == Import
import './styles.scss';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';


// == Composant
const App = () => {
  return <div className="app">
    <Header isLogged={true} />
    
    {/* <Page>
      //TODO
    </Page>
    */}
    <Footer /> 
  </div>

};

// == Export
export default App;
