import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {
  // Login,
  Home,
  List,
} from 'components';
// import PrivateRoute from './private-route';

const Pages = () => <Routes>
  {/* <Route path={'/login'} element={<Login />} />
  <Route path={'/'} element={<PrivateRoute element={Home} />}>
    <Route index element={<PrivateRoute element={List} />} />
  </Route> */}
  <Route path={'/'} element={<Home />}>
    <Route index element={<List />} />
  </Route>
</Routes>;

export default Pages;
