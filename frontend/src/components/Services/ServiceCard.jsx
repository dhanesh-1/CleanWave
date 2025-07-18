import React from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Clock, Star } from 'lucide-react';

const ServiceCard = ({ service, provider }) => {
  const { addToCart } = useApp();

  const handleAddToCart = () => {
    addToCart({
      ...service,
      providerId: provider.id,
      providerName: provider.name
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
              <span className="text-2xl">{service.icon}</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
              <p className="text-sm text-gray-600">{provider.name}</p>
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors group"
          >
            <Plus size={18} className="group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        <p className="text-gray-600 mb-4">{service.description}</p>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-blue-600">${service.price}</span>
            <span className="text-sm text-gray-500">{service.unit}</span>
          </div>
          
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Clock size={16} className="text-green-600" />
              <span className="text-green-600 font-medium">{service.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star size={16} className="text-yellow-500" />
              <span className="text-gray-600">{provider.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;