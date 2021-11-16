import React, {useState} from 'react';
import {Redirect, useLocation} from 'react-router-dom';
import {fakeAuth} from '../../utils/helpers';

export const Login = () => {
  const [redirectTo, setRedirectTo] = useState(false);

  const login = () => {
    fakeAuth.authenticate(() => {
      setRedirectTo(true);
    });
  };

  const {state} = useLocation();

  if (redirectTo) {
    return <Redirect to={state?.from || '/login'} />;
  }

  return (
    <div className="flex items-center justify-center h-screen dark:bg-gray-800">
      <div>
        <h1 className="font-bold text-6xl dark:text-gray-200">
          You must login to view this page
        </h1>
        <button
          onClick={login}
          className="h-10 text-xl px-3 border mt-4 dark:text-gray-200">
          Log in
        </button>
      </div>
    </div>
  );
};
