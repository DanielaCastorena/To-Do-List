import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './Login';
import TodoList from './TodoList';
import LoginPage from './LoginPage';
import ProfileDropdown from './ProfileDropdown';
import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Main />
      </Router>
    </AuthProvider>
  );
};

const Main = () => {
  const { loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app-container">
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/todo" element={<ProtectedRoute><TodoList /></ProtectedRoute>} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

const Header = () => {
  const { user } = useAuth();
  const firstName = user?.displayName ? user.displayName.split(' ')[0] : '';

  return (
    <header className="app-header">
      <h1>{firstName ? `${firstName}'s To-Do List` : 'To-Do List'}</h1>
      <ProfileDropdown />
    </header>
  );
};

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default App;
