import {BrowserRouter as Router, Route} from 'react-router-dom';
import {NavBar} from '../shared/navbar';
import {AuthedRoute} from './AuthedRoutes';
import {DashboardRoutes} from './DashboardRoutes';
import {HomeRoutes} from './HomeRoutes';

export const Routers = () => {
  return (
    <Router>
      <NavBar />

      {HomeRoutes.map(({Component, path}) => (
        <Route path={path} key={path}>
          <Component />
        </Route>
      ))}

      {DashboardRoutes.map(({Component, path}) => (
        <AuthedRoute path={path} key={path}>
          <Component />
        </AuthedRoute>
      ))}
    </Router>
  );
};
