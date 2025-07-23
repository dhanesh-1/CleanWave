import React from 'react';
import { ArrowLeft, Star, MapPin, Phone, Mail, Users, Calendar } from 'lucide-react';
import { serviceProviders, services } from '../data/mockData';
import ServiceCard from '../components/ServiceCard';

const ProviderDetailPage = ({ providerId, onBack, onViewServiceDetails }) => {
  const provider = serviceProviders.find(p => p._id === providerId);
  const providerServices = services.filter(s => s.provider === providerId);

  if (!provider) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Provider not found</p>
          <button
            onClick={onBack}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const stats = [
    { icon: Star, label: 'Rating', value: provider.avgRating },
    { icon: Users, label: 'Services', value: providerServices.length },
    { icon: Calendar, label: 'Since', value: new Date(provider.created_at).getFullYear() }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Providers
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          {/* Provider Header */}
          <div className="relative h-64 md:h-80">
            <img
              src={provider.image}
              alt={provider.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{provider.name}</h1>
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" />
                <span className="text-lg font-medium">{provider.avgRating} Rating</span>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Provider Info */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">About</h2>
                <p className="text-gray-600 leading-relaxed mb-6">{provider.desc}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                        <Icon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Address</p>
                      <p className="text-gray-600">
                        {provider.address.street}<br />
                        {provider.address.city}, {provider.address.state} {provider.address.pincode}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <p className="text-gray-600">{provider.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-gray-600">{provider.email}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Contact Provider
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        {providerServices.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Services Offered</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {providerServices.map((service) => (
                <ServiceCard
                  key={service._id}
                  service={service}
                  provider={provider}
                  onViewDetails={() => onViewServiceDetails(service._id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderDetailPage;
