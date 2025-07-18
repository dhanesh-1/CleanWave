import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import ServiceCard from '../components/Services/ServiceCard';
import { Search, Filter, MapPin } from 'lucide-react';

const Services = () => {
  const { services, providers } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  const serviceOptions = [
    { value: 'all', label: 'All Services' },
    { value: '1', label: 'Wash & Fold' },
    { value: '2', label: 'Dry Cleaning' },
    { value: '3', label: 'Ironing' },
    { value: '4', label: 'Stain Removal' }
  ];

  const filteredProviders = providers.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesService = selectedService === 'all' || 
                          provider.services.includes(parseInt(selectedService));
    
    return matchesSearch && matchesService;
  });

  const sortedProviders = [...filteredProviders].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'distance') return parseFloat(a.distance) - parseFloat(b.distance);
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our wide range of professional laundry services
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search providers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                {serviceOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="rating">Sort by Rating</option>
                <option value="distance">Sort by Distance</option>
              </select>
            </div>
          </div>
        </div>

        {/* Providers and Services */}
        <div className="space-y-8">
          {sortedProviders.map(provider => (
            <div key={provider.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{provider.name}</h2>
                    <div className="flex items-center space-x-2 text-gray-600 mt-1">
                      <MapPin size={16} />
                      <span>{provider.address}</span>
                      <span className="text-blue-600 font-medium">• {provider.distance}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      <span className="text-2xl font-bold text-yellow-500">★</span>
                      <span className="text-lg font-bold text-gray-900">{provider.rating}</span>
                      <span className="text-gray-600">({provider.reviews} reviews)</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{provider.hours}</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services
                    .filter(service => provider.services.includes(service.id))
                    .map(service => (
                      <ServiceCard
                        key={service.id}
                        service={service}
                        provider={provider}
                      />
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;