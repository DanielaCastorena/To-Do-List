import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from './firebase'; // Adjust based on your path

const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // For handling loading state

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        // Do not automatically set a guest user
        setUser(null);
      }
      setLoading(false); // Set loading to false once the state is determined
    });
    return unsubscribe;
  }, []);

  // Sign in with Google
  const googleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };
// Inside AuthProvider.js
const continueAsGuest = () => {
  const guestUser = { displayName: '', photoURL: './pfp.png' };
  localStorage.setItem('guest', JSON.stringify(guestUser)); // Store guest info in local storage
  setUser(guestUser); // Set guest user in state
};

  // Sign out
  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('guest'); // Clear guest data
      localStorage.removeItem('tasks'); // Optionally clear tasks
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

// Return the continueAsGuest function in the context
return (
  <AuthContext.Provider value={{ user, googleSignIn, logout, loading, continueAsGuest }}>
    {children}
  </AuthContext.Provider>
);

};

export default AuthProvider;
