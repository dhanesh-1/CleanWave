import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Star,
  MapPin,
  Phone,
  Mail,
  Plus,
  Calendar,
  Clock,
  Shield
} from 'lucide-react';
import { services, serviceProviders } from '../data/mockData';
import { useCart } from '../contexts/CartContext';

const ServiceDetailPage = ({ onBack }) => {
  const navigate = useNavigate();

  const { serviceId } = useParams();
  const { addToCart } = useCart();

  const service = services.find(s => s._id === serviceId);
  const provider = service ? serviceProviders.find(p => p._id === service.provider) : null;

  if (!service || !provider) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Service not found</p>
          <button
            onClick={()=>navigate(-1)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(service, provider);
  };

  const features = [
    {
      icon: Shield,
      title: 'Verified Provider',
      description: 'Background checked and verified'
    },
    {
      icon: Clock,
      title: 'Quick Response',
      description: 'Fast response time guaranteed'
    },
    {
      icon: Calendar,
      title: 'Flexible Booking',
      description: 'Book at your convenience'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={()=>navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Service Image */}
          <div className="relative h-80 md:h-96">
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 right-6">
              <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-lg font-medium">
                ₹{service.price} {service.unit}
              </span>
            </div>
          </div>

          <div className="p-8">
            {/* Service Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {service.name}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">{service.desc}</p>
            </div>

            {/* Provider Info */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="flex items-start space-x-4">
                <img
                  src={provider.image}
                  alt={provider.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {provider.name}
                  </h3>
                  <div className="flex items-center mb-3">
                    <Star className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" />
                    <span className="font-medium mr-2">{provider.avgRating}</span>
                    <span className="text-gray-600">• Verified Provider</span>
                  </div>
                  <p className="text-gray-600 mb-4">{provider.desc}</p>

                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>
                        {provider.address.street}, {provider.address.city}, {provider.address.state}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>{provider.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-600 md:col-span-2">
                      <Mail className="w-4 h-4 mr-2" />
                      <span>{provider.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="text-center p-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add to Cart
              </button>
              <button className="flex-1 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                Contact Provider
              </button>
            </div>

            {/* Service Details */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Service Details</h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div>
                  <span className="font-medium text-gray-900">Service Type:</span>
                  <p className="text-gray-600 mt-1">{service.name}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Pricing:</span>
                  <p className="text-gray-600 mt-1">₹{service.price} {service.unit}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Available Since:</span>
                  <p className="text-gray-600 mt-1">
                    {new Date(service.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-900">Last Updated:</span>
                  <p className="text-gray-600 mt-1">
                    {new Date(service.updated_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
};

export default ServiceDetailPage;
