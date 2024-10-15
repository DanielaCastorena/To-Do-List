import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from './firebase';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user ? user : null);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const googleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  const continueAsGuest = () => {
    const guestUser = { displayName: '', photoURL: './pfp.png' };
    localStorage.setItem('guest', JSON.stringify(guestUser));
    setUser(guestUser);
  };

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('guest');
      localStorage.removeItem('tasks');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, googleSignIn, logout, loading, continueAsGuest }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
