import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Cart from './pages/Cart';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (role && user.role !== role) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }
  
  return children;
};

const AppContent = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/login" element={user ? <Navigate to={`/${user.role}/dashboard`} /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to={`/${user.role}/dashboard`} /> : <Register />} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          
          {/* Customer Routes */}
          <Route path="/customer/dashboard" element={
            <ProtectedRoute role="customer">
              <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h1 className="text-2xl font-bold text-gray-900 mb-8">Customer Dashboard</h1>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <p className="text-gray-600">Welcome to your customer dashboard!</p>
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          } />
          
          {/* Provider Routes */}
          <Route path="/provider/dashboard" element={
            <ProtectedRoute role="provider">
              <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h1 className="text-2xl font-bold text-gray-900 mb-8">Provider Dashboard</h1>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <p className="text-gray-600">Welcome to your provider dashboard!</p>
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          } />
          
          {/* Driver Routes */}
          <Route path="/driver/dashboard" element={
            <ProtectedRoute role="driver">
              <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h1 className="text-2xl font-bold text-gray-900 mb-8">Driver Dashboard</h1>
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <p className="text-gray-600">Welcome to your driver dashboard!</p>
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <AppContent />
        </Router>
      </AppProvider>
    </AuthProvider>
  );
};

export default App;