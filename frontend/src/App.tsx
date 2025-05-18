import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import Register from './pages/Register';
import NewComplaint from './pages/NewComplaint';
import TrackComplaint from './pages/TrackComplaint';
import AdminDashboard from './pages/AdminDashboard';
import UserComplaints from './pages/UserComplaints';
import { useAuth } from './contexts/AuthContext';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  
  // Debug logging
  console.log('AdminRoute check:', { 
    isAuthenticated, 
    userRole: user?.role,
    hasAccess: isAuthenticated && (user?.role === 'ROLE_ADMIN' || user?.role === 'ADMIN')
  });
  
  // Check for either 'ROLE_ADMIN' or 'ADMIN' to be more flexible
  const isAdmin = isAuthenticated && (user?.role === 'ROLE_ADMIN' || user?.role === 'ADMIN');
  
  return isAdmin ? (
    <>{children}</>
  ) : (
    <Navigate to="/admin/login" />
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/complaints" 
              element={
                <PrivateRoute>
                  <UserComplaints />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/complaints/new" 
              element={
                <PrivateRoute>
                  <NewComplaint />
                </PrivateRoute>
              } 
            />
            <Route path="/complaints/track" element={<TrackComplaint />} />
            <Route
              path="/complaints/track/:ticketId"
              element={<TrackComplaint />}
            />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
