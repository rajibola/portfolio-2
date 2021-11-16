import {Route, Redirect} from 'react-router-dom';
import {fakeAuth} from '../utils/helpers';

export const AuthedRoute = ({children, ...rest}) => {
  return (
    <Route
      {...rest}
      render={({location}) => {
        return fakeAuth.isAuthenticated === true ? (
          children
        ) : (
          <Redirect to={{pathname: '/login', state: {from: location}}} />
        );
      }}
    />
  );
};
