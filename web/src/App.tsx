import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" />;
};

// Public Route component (redirect to trades if already logged in)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return !user ? <>{children}</> : <Navigate to="/trades" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />
            <Route 
              path="/register" 
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              } 
            />

            {/* Protected routes */}
            <Route 
              path="/trades" 
              element={
                <Layout>
                  <div className="p-8">
                    <h1 className="text-2xl font-bold">Browse Trades</h1>
                    <p className="text-gray-600 mt-2">Trade functionality coming soon...</p>
                  </div>
                </Layout>
              } 
            />
            <Route 
              path="/my-trades" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <div className="p-8">
                      <h1 className="text-2xl font-bold">My Trades</h1>
                      <p className="text-gray-600 mt-2">Your trades will appear here...</p>
                    </div>
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/create-trade" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <div className="p-8">
                      <h1 className="text-2xl font-bold">Create Trade</h1>
                      <p className="text-gray-600 mt-2">Trade creation form coming soon...</p>
                    </div>
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/transactions" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <div className="p-8">
                      <h1 className="text-2xl font-bold">Transactions</h1>
                      <p className="text-gray-600 mt-2">Transaction history coming soon...</p>
                    </div>
                  </Layout>
                </ProtectedRoute>
              } 
            />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
