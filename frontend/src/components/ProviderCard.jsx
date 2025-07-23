import React from 'react';
import { Star, MapPin, Phone, Mail, Eye } from 'lucide-react';

const ProviderCard = ({ provider, onViewDetails }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <img
          src={provider.image}
          alt={provider.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <div className="bg-white px-3 py-1 rounded-full flex items-center shadow-md">
            <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
            <span className="font-medium text-gray-900">{provider.avgRating}</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{provider.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{provider.desc}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            <span>{provider.address.city}, {provider.address.state}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="w-4 h-4 mr-2 text-gray-400" />
            <span>{provider.phone}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="w-4 h-4 mr-2 text-gray-400" />
            <span>{provider.email}</span>
          </div>
        </div>
        
        <button
          onClick={onViewDetails}
          className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProviderCard;
