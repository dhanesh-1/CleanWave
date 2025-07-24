// import React, { useState } from 'react';
// import { Search, ShoppingCart, User, LogIn, Menu, X } from 'lucide-react';
// import { useAuth } from '../contexts/AuthContext';
// import { useCart } from '../contexts/CartContext';
// import { useNavigate } from 'react-router-dom';

// const Header = ({ onShowAuth, onShowCart, currentPage, onNavigate }) => {
//   const { user, logout } = useAuth();
//   const { itemCount } = useCart();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     onNavigate('home');
//     setIsMobileMenuOpen(false);
//   };

//   const navItems = [
//     { label: 'Home', value: 'home' },
//     { label: 'Services', value: 'services' },
//     { label: 'Providers', value: 'providers' },
//   ];

//   return (
//     <header className="bg-white shadow-lg sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div 
//             className="flex items-center cursor-pointer"
//             onClick={() => navigate('home')}
//           >
//             <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
//               <span className="text-white font-bold text-sm">S</span>
//             </div>
//             <h1 className="text-xl font-bold text-gray-900">ServiceHub</h1>
//           </div>

//           {/* Search Bar - Desktop */}
//           <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
//             <div className="relative w-full">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search services..."
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
//           </div>

//           {/* Navigation - Desktop */}
//           <nav className="hidden md:flex items-center space-x-6">
//             {navItems.map((item) => (
//               <button
//                 key={item.value}
//                 onClick={() => navigate(item.value)}
//                 className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//                   currentPage === item.value
//                     ? 'text-blue-600 bg-blue-50'
//                     : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
//                 }`}
//               >
//                 {item.label}
//               </button>
//             ))}
//           </nav>

//           {/* Right Side Actions */}
//           <div className="flex items-center space-x-4">
//             {/* Cart */}
//             <button
//               onClick={onShowCart}
//               className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
//             >
//               <ShoppingCart className="w-6 h-6" />
//               {itemCount > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                   {itemCount}
//                 </span>
//               )}
//             </button>

//             {/* User Menu - Desktop */}
//             <div className="hidden md:flex items-center space-x-2">
//               {user ? (
//                 <div className="flex items-center space-x-3">
//                   <button
//                     onClick={() => navigate(user.role === 'provider' ? 'provider-dashboard' : 'customer-dashboard')}
//                     className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:text-blue-600 transition-colors"
//                   >
//                     <User className="w-4 h-4" />
//                     <span>{user.fullName}</span>
//                   </button>
//                   <button
//                     onClick={handleLogout}
//                     className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               ) : (
//                 <button
//                   onClick={onShowAuth}
//                   className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                   <LogIn className="w-4 h-4" />
//                   <span>Login</span>
//                 </button>
//               )}
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
//             >
//               {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden border-t border-gray-200 py-4">
//             {/* Search Bar - Mobile */}
//             <div className="mb-4">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Search services..."
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             {/* Navigation Links */}
//             <div className="space-y-2 mb-4">
//               {navItems.map((item) => (
//                 <button
//                   key={item.value}
//                   onClick={() => navigate(item.value)}
//                   className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
//                     currentPage === item.value
//                       ? 'text-blue-600 bg-blue-50'
//                       : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
//                   }`}
//                 >
//                   {item.label}
//                 </button>
//               ))}
//             </div>

//             {/* User Actions - Mobile */}
//             <div className="border-t border-gray-200 pt-4">
//               {user ? (
//                 <div className="space-y-2">
//                   <button
//                     onClick={() => navigate(user.role === 'provider' ? 'provider-dashboard' : 'customer-dashboard')}
//                     className="flex items-center space-x-2 w-full px-3 py-2 text-left text-base text-gray-700 hover:text-blue-600 transition-colors"
//                   >
//                     <User className="w-5 h-5" />
//                     <span>{user.fullName}</span>
//                   </button>
//                   <button
//                     onClick={handleLogout}
//                     className="w-full px-3 py-2 text-left text-base bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               ) : (
//                 <button
//                   onClick={() => {
//                     onShowAuth();
//                     setIsMobileMenuOpen(false);
//                   }}
//                   className="flex items-center space-x-2 w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                   <LogIn className="w-5 h-5" />
//                   <span>Login</span>
//                 </button>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;



import React, { useState } from 'react';
import { Search, ShoppingCart, User, LogIn, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = ({ onShowAuth, onShowCart }) => {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'Home', value: '' },
    { label: 'Services', value: 'services' },
    { label: 'Providers', value: 'providers' },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">ServiceHub</h1>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <NavLink
                key={item.value}
                to={`/${item.value}`}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <button
              onClick={onShowCart}
              className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* User Menu - Desktop */}
            <div className="hidden md:flex items-center space-x-2">
              {user ? (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() =>
                      navigate(
                        user.role === 'provider'
                          ? '/provider-dashboard'
                          : '/customer-dashboard'
                      )
                    }
                    className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>{user.fullName}</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={onShowAuth}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            {/* Search Bar - Mobile */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search services..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-2 mb-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.value}
                  to={`/${item.value}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            {/* User Actions - Mobile */}
            <div className="border-t border-gray-200 pt-4">
              {user ? (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      navigate(
                        user.role === 'provider'
                          ? '/provider-dashboard'
                          : '/customer-dashboard'
                      );
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-left text-base text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span>{user.fullName}</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-3 py-2 text-left text-base bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    onShowAuth();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
