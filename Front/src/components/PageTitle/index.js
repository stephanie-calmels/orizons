import React from 'react';

import './pageTitle.scss';

const Title = ({ texte }) => (
  <h1 className="text-center p-4 font-weight-bold page-title">{texte}</h1>
);

export default Title;
