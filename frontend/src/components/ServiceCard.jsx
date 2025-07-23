import React from 'react';
import { Star, MapPin, Plus, Eye } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const ServiceCard = ({ service, provider, onViewDetails }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(service, provider);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            ₹{service.price} {service.unit}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{service.desc}</p>
        
        <div className="flex items-center mb-4">
          <img
            src={provider.image}
            alt={provider.name}
            className="w-8 h-8 rounded-full mr-3 object-cover"
          />
          <div className="flex-1">
            <p className="font-medium text-gray-900">{provider.name}</p>
            <div className="flex items-center text-sm text-gray-600">
              <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
              <span>{provider.avgRating}</span>
              <MapPin className="w-3 h-3 ml-2 mr-1" />
              <span>{provider.address.city}</span>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={onViewDetails}
            className="flex-1 flex items-center justify-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <Eye className="w-4 h-4 mr-2" />
            Details
          </button>
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
