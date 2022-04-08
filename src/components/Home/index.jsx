import React from 'react';
import {Outlet} from 'react-router';
import {Topbar} from 'widgets';

export const Home = () => {
  return <div>
    <Topbar />
    <Outlet />
  </div>;
};
