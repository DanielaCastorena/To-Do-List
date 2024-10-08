import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Login';

const SignOut = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logout();
      navigate('/login', { replace: true });
      console.log("User signed out and redirected to login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <button onClick={handleSignOut}>
      Sign Out
    </button>
  );
};

export default SignOut;
