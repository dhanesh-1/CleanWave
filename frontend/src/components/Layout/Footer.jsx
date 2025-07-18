import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <span className="text-xl font-bold">LaundryPro</span>
            </Link>
            <p className="text-gray-400">
              Professional laundry services at your doorstep. Quality cleaning, convenient scheduling, and reliable delivery.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/providers" className="text-gray-400 hover:text-white transition-colors">
                  Find Providers
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">For Businesses</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/provider/register" className="text-gray-400 hover:text-white transition-colors">
                  Become a Provider
                </Link>
              </li>
              <li>
                <Link to="/driver/register" className="text-gray-400 hover:text-white transition-colors">
                  Join as Driver
                </Link>
              </li>
              <li>
                <Link to="/business" className="text-gray-400 hover:text-white transition-colors">
                  Business Solutions
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-blue-400" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-blue-400" />
                <span className="text-gray-400">support@laundrypro.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-blue-400" />
                <span className="text-gray-400">123 Main St, City, State</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} className="text-blue-400" />
                <span className="text-gray-400">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 LaundryPro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;