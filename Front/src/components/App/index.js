// == Import npm
import React from 'react';

// == Import
import './styles.scss';
import Trip from 'src/components/Trip'

import 'bootstrap/dist/css/bootstrap.min.css';

// == Composant
const App = () => {
  return <div className="app">
  <Trip />
  </div>
};

// == Export
export default App;
