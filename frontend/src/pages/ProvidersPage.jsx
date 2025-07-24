import React, { useState } from 'react';
import { Filter, Grid, List, Star } from 'lucide-react';
import ProviderCard from '../components/ProviderCard';
import { serviceProviders } from '../data/mockData';

const ProvidersPage = ({ onViewProviderDetails }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [minRating, setMinRating] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const locations = [
    { value: 'all', label: 'All Locations' },
    { value: 'california', label: 'California' },
    { value: 'arizona', label: 'Arizona' },
    { value: 'texas', label: 'Texas' },
  ];

  const ratingOptions = [
    { value: 'all', label: 'All Ratings' },
    { value: '4', label: '4+ Stars' },
    { value: '4.5', label: '4.5+ Stars' },
    { value: '4.8', label: '4.8+ Stars' },
  ];

  const filteredProviders = serviceProviders.filter(provider => {
    const matchesSearch =
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.desc.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLocation =
      selectedLocation === 'all' ||
      provider.address.state.toLowerCase().includes(selectedLocation);

    const matchesRating =
      minRating === 'all' || provider.avgRating >= parseFloat(minRating);

    return matchesSearch && matchesLocation && matchesRating;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Service Providers</h1>
          <p className="text-lg text-gray-600">
            Find trusted and verified service providers in your area.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center mb-4">
            <Filter className="w-5 h-5 text-gray-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search providers..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {locations.map(location => (
                  <option key={location.value} value={location.value}>
                    {location.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {ratingOptions.map(rating => (
                  <option key={rating.value} value={rating.value}>
                    {rating.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProviders.length} provider{filteredProviders.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Providers List/Grid */}
        {filteredProviders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No providers found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedLocation('all');
                setMinRating('all');
              }}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div
            className={`grid gap-8 ${
              viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1'
            }`}
          >
            {filteredProviders.map((provider) => (
              <ProviderCard
                key={provider._id}
                providerId={provider._id}
                onViewDetails={() => onViewProviderDetails(provider._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProvidersPage;
