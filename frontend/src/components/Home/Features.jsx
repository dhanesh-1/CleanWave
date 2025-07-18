import React from 'react';
import { Truck, Shield, Clock, Star, MapPin, CreditCard } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Truck,
      title: 'Free Pickup & Delivery',
      description: 'Convenient pickup and delivery service right to your doorstep',
      color: 'blue'
    },
    {
      icon: Shield,
      title: 'Insured & Protected',
      description: 'Your items are fully insured and protected during the entire process',
      color: 'green'
    },
    {
      icon: Clock,
      title: '24/7 Service',
      description: 'Available around the clock to meet your laundry needs',
      color: 'orange'
    },
    {
      icon: Star,
      title: 'Quality Guarantee',
      description: '100% satisfaction guarantee on all our services',
      color: 'yellow'
    },
    {
      icon: MapPin,
      title: 'Real-time Tracking',
      description: 'Track your order in real-time from pickup to delivery',
      color: 'purple'
    },
    {
      icon: CreditCard,
      title: 'Secure Payment',
      description: 'Multiple payment options with secure processing',
      color: 'teal'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      orange: 'bg-orange-100 text-orange-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      purple: 'bg-purple-100 text-purple-600',
      teal: 'bg-teal-100 text-teal-600'
    };
    return colors[color] || colors.blue;
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose LaundryPro?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're committed to providing the best laundry experience with professional service and modern technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${getColorClasses(feature.color)}`}>
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;