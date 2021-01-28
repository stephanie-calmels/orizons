import React from 'react';
import PropTypes from 'prop-types';

import './page.scss';

const Page = ({ children }) => (
  <main className="page">
    {children}
  </main>
);

Page.propTypes = {
  children: PropTypes.oneOfType([ // soit....
    PropTypes.arrayOf(PropTypes.node), // un tableau d'elements JSX
    PropTypes.node, // un seul element JSX
  ]).isRequired,
};

export default Page;
