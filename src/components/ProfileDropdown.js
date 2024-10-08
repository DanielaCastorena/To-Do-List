import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from './Login'; // Import useAuth to access user and logout
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import './ProfileDropdown.css';

const ProfileDropdown = () => {
  const { user } = useAuth(); 
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      if (user) {
        // If user is logged in, sign out from Firebase
        await signOut(auth);
        console.log("User signed out successfully");
      } else {
        // If user is a guest, clear local storage
        localStorage.removeItem('guest');
        localStorage.removeItem('tasks'); // Optionally clear guest tasks
        console.log("Guest signed out successfully");
        // Optionally, reset user state if you're using context
        // For example, call a function to reset the user in context
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  
    // Optional: Force a refresh or redirect
    window.location.reload(); // This will refresh the app
  };
  

  // Use 'pfp.png' if user is not defined
  const profilePic = user ? user.photoURL : './public/pfp.png';

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <img
        src={profilePic}
        alt="Profile"
        className="profile-pic"
        onClick={toggleDropdown}
      />
      {isOpen && (
        <div className="dropdown-menu">
          <button onClick={handleSignOut} className="logout-button">
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
