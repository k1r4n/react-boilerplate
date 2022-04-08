import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import '/static/styles/style.scss';
import Pages from './pages';

render((
  <React.StrictMode>
    <Router>
      <Pages />
    </Router>
  </React.StrictMode>
), document.getElementById('root'));
