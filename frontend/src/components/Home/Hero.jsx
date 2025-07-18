import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Star, Shield } from 'lucide-react';

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-teal-50 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Professional
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600">
                  {' '}Laundry{' '}
                </span>
                at Your Doorstep
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Experience hassle-free laundry service with pickup and delivery. 
                Quality cleaning, affordable prices, and reliable service you can trust.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/services"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors group"
              >
                Book Now
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link
                to="/providers"
                className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Find Providers
              </Link>
            </div>

            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="text-blue-600" size={20} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">24/7 Service</p>
                  <p className="text-sm text-gray-600">Available anytime</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Star className="text-yellow-600" size={20} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">4.9 Rating</p>
                  <p className="text-sm text-gray-600">Trusted by thousands</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Shield className="text-green-600" size={20} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Insured</p>
                  <p className="text-sm text-gray-600">100% guaranteed</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 rounded-3xl transform rotate-3"></div>
            <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
              <img
                src="https://images.pexels.com/photos/6196237/pexels-photo-6196237.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Professional laundry service"
                className="w-full h-80 object-cover rounded-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-900">Live Tracking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;