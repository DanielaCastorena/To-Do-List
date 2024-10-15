import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from './Login';
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
        await signOut(auth);
        console.log("User signed out successfully");
      } else {
        localStorage.removeItem('guest');
        localStorage.removeItem('tasks');
        console.log("Guest signed out successfully");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
    window.location.reload();
  };

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
