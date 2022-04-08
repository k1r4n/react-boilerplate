import React, {useState, useEffect} from 'react';
import {Navigate, useLocation} from 'react-router';

const PrivateRoute = (props) => {
  const {pathname} = useLocation();
  let accessToken = window.localStorage.getItem('access_token');
  const [isAuthenticated, setIsAuthenticated] = useState(accessToken ? true : false);
  useEffect(() => {
    accessToken = window.localStorage.getItem('access_token');
    if (!accessToken) {
      setIsAuthenticated(false);
    }
  }, [pathname]);
  if (isAuthenticated) {
    return <props.element {...props} />;
  }
  return <Navigate to='/login' />;
};

export default PrivateRoute;
