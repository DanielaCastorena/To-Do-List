import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from './firebase';
import { signInWithPopup } from 'firebase/auth';
import { useAuth } from './Login';

const LoginPage = () => {
  const { user, continueAsGuest } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/todo');
    }
  }, [user, navigate]);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/todo');
    } catch (error) {
      console.error('Error logging in with Google:', error);
    }
  };

  const handleGuestLogin = () => {
    continueAsGuest();
    navigate('/todo');
  };
  
  return (
    <div className="login-page">
      <h2>Login</h2>
      <button onClick={handleGoogleLogin}>Login with Google</button>
      <button onClick={handleGuestLogin}>Continue as Guest</button>
    </div>
  );
};

export default LoginPage;
