import React from 'react';
import { useAuth } from './Login';

const Buttons = () => {
  const { user, googleSignIn, logout } = useAuth();

  return (
    <div>
      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={googleSignIn}>Login with Google</button>
      )}
    </div>
  );
};

export default Buttons;
