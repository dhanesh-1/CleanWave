import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Users, Shield, Clock, ArrowRight } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import ProviderCard from '../components/ProviderCard';
import { services, serviceProviders } from '../data/mockData';

const HomePage = ({ onViewServiceDetails, onViewProviderDetails }) => {
  const navigate = useNavigate();
  const featuredServices = services.slice(0, 3);
  const featuredProviders = serviceProviders.slice(0, 3);

  const features = [
    {
      icon: Users,
      title: 'Trusted Providers',
      description: 'All service providers are verified and rated by customers',
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Safe and secure payment processing with multiple options',
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock customer support for all your needs',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find the Perfect
              <span className="block text-blue-200">Service for You</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Connect with trusted service providers in your area. From home cleaning to repairs, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search services..."
                  className="w-full pl-12 pr-4 py-3 bg-blue-500 rounded-lg focus:outline-none focus:ring-2"
                />
              </div>
              <button className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ServiceHub?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We make it easy to find and book quality services from trusted providers in your area.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Popular Services
              </h2>
              <p className="text-lg text-gray-600">
                Book these trending services from our top-rated providers.
              </p>
            </div>
            <button onClick={()=>navigate('/services')} className="hidden md:flex items-center text-blue-600 hover:text-blue-700 font-medium">
              View All Services
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service) => {
              return (
                <ServiceCard
                  key={service._id}
                  serviceId={service._id}
                  onViewDetails={() => onViewServiceDetails(service._id)}
                />
              );
            })}
          </div>
          {/* <div className="text-center mt-8 md:hidden">
            <button className="flex items-center mx-auto text-blue-600 hover:text-blue-700 font-medium">
              View All Services
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div> */}
        </div>
      </section>

      {/* Featured Providers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Top Service Providers
              </h2>
              <p className="text-lg text-gray-600">
                Meet our highly-rated service providers trusted by thousands.
              </p>
            </div>
            <button onClick={()=>navigate('/providers')} className="hidden md:flex items-center text-blue-600 hover:text-blue-700 font-medium">
              View All Providers
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProviders.map((provider) => (
              <ProviderCard
                key={provider._id}
                providerId={provider._id}
                onViewDetails={() => onViewProviderDetails(provider._id)}
              />
            ))}
          </div>
          {/* <div className="text-center mt-8 md:hidden">
            <button onClick={()=>navigate('/providers')} className="flex items-center mx-auto text-blue-600 hover:text-blue-700 font-medium">
              View All Providers
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div> */}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of satisfied customers who trust ServiceHub for their service needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={()=>navigate('/services')} className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
              Book a Service
            </button>
            <button className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold">
              Become a Provider
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
