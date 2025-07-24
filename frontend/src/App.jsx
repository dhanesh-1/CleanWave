// import React, { useState } from 'react';
// import { AuthProvider } from './contexts/AuthContext';
// import { CartProvider } from './contexts/CartContext';
// import Header from './components/Header';
// import AuthModal from './components/AuthModal';
// import CartModal from './components/CartModal';
// import HomePage from './pages/HomePage';
// import ServicesPage from './pages/ServicesPage';
// import ProvidersPage from './pages/ProvidersPage';
// import ServiceDetailPage from './pages/ServiceDetailPage';
// import ProviderDetailPage from './pages/ProviderDetailPage';
// import CustomerDashboard from './pages/CustomerDashboard';
// import ProviderDashboard from './pages/ProviderDashboard';

// function App() {
//   const [currentPage, setCurrentPage] = useState('home');
//   const [detailPage, setDetailPage] = useState(null);
//   const [selectedId, setSelectedId] = useState('');
//   const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
//   const [isCartModalOpen, setIsCartModalOpen] = useState(false);

//   const handleNavigate = (page) => {
//     setCurrentPage(page);
//     setDetailPage(null);
//     setSelectedId('');
//   };

//   const handleViewServiceDetails = (serviceId) => {
//     setSelectedId(serviceId);
//     setDetailPage('service-detail');
//   };

//   const handleViewProviderDetails = (providerId) => {
//     setSelectedId(providerId);
//     setDetailPage('provider-detail');
//   };

//   const handleBackFromDetail = () => {
//     setDetailPage(null);
//     setSelectedId('');
//   };

//   const renderCurrentPage = () => {
//     if (detailPage === 'service-detail') {
//       return (
//         <ServiceDetailPage 
//           serviceId={selectedId} 
//           onBack={handleBackFromDetail} 
//         />
//       );
//     }

//     if (detailPage === 'provider-detail') {
//       return (
//         <ProviderDetailPage 
//           providerId={selectedId} 
//           onBack={handleBackFromDetail}
//           onViewServiceDetails={handleViewServiceDetails}
//         />
//       );
//     }

//     switch (currentPage) {
//       case 'home':
//         return (
//           <HomePage
//             onViewServiceDetails={handleViewServiceDetails}
//             onViewProviderDetails={handleViewProviderDetails}
//           />
//         );
//       case 'services':
//         return <ServicesPage onViewServiceDetails={handleViewServiceDetails} />;
//       case 'providers':
//         return <ProvidersPage onViewProviderDetails={handleViewProviderDetails} />;
//       case 'customer-dashboard':
//         return <CustomerDashboard />;
//       case 'provider-dashboard':
//         return <ProviderDashboard />;
//       default:
//         return (
//           <HomePage
//             onViewServiceDetails={handleViewServiceDetails}
//             onViewProviderDetails={handleViewProviderDetails}
//           />
//         );
//     }
//   };

//   return (
//         <div className="min-h-screen bg-gray-50">
//           <Header
//             onShowAuth={() => setIsAuthModalOpen(true)}
//             onShowCart={() => setIsCartModalOpen(true)}
//             currentPage={detailPage ? 'detail' : currentPage}
//             onNavigate={handleNavigate}
//           />
          
//           <main>
//             {renderCurrentPage()}
//           </main>

//           <AuthModal
//             isOpen={isAuthModalOpen}
//             onClose={() => setIsAuthModalOpen(false)}
//           />
          
//           <CartModal
//             isOpen={isCartModalOpen}
//             onClose={() => setIsCartModalOpen(false)}
//             onShowAuth={() => {
//               setIsCartModalOpen(false);
//               setIsAuthModalOpen(true);
//             }}
//           />
//         </div>
//   );
// }

// export default App;



import React, { useState } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useNavigate
} from 'react-router-dom';

import Header from './components/Header';
import AuthModal from './components/AuthModal';
import CartModal from './components/CartModal';

import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ProvidersPage from './pages/ProvidersPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import ProviderDetailPage from './pages/ProviderDetailPage';
import CustomerDashboard from './pages/CustomerDashboard';
import ProviderDashboard from './pages/ProviderDashboard';

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const navigate = useNavigate()

  return (
          <div className="min-h-screen bg-gray-50">
            <Header
              onShowAuth={() => setIsAuthModalOpen(true)}
              onShowCart={() => setIsCartModalOpen(true)}
            />

            <main>
              <Routes>
                <Route
                  path="/"
                  element={
                    <HomePage
                      // Pass navigation props if needed
                      onViewServiceDetails={()=>navigate()}
                    />
                  }
                />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/providers" element={<ProvidersPage />} />
                <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
                <Route path="/providers/:providerId" element={<ProviderDetailPage />} />
                <Route path="/customer-dashboard" element={<CustomerDashboard />} />
                <Route path="/provider-dashboard" element={<ProviderDashboard />} />
                {/* Redirect unknown paths */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>

            <AuthModal
              isOpen={isAuthModalOpen}
              onClose={() => setIsAuthModalOpen(false)}
            />
            <CartModal
              isOpen={isCartModalOpen}
              onClose={() => setIsCartModalOpen(false)}
              onShowAuth={() => {
                setIsCartModalOpen(false);
                setIsAuthModalOpen(true);
              }}
            />
          </div>
  );
}

export default App;
