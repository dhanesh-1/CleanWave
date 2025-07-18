import React from 'react';
import { Users, Package, Star, MapPin } from 'lucide-react';

const Stats = () => {
  const stats = [
    {
      icon: Users,
      value: '10,000+',
      label: 'Happy Customers',
      color: 'blue'
    },
    {
      icon: Package,
      value: '50,000+',
      label: 'Orders Completed',
      color: 'green'
    },
    {
      icon: Star,
      value: '4.9',
      label: 'Average Rating',
      color: 'yellow'
    },
    {
      icon: MapPin,
      value: '25+',
      label: 'Cities Served',
      color: 'purple'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      yellow: 'from-yellow-500 to-yellow-600',
      purple: 'from-purple-500 to-purple-600'
    };
    return colors[color] || colors.blue;
  };

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Join our growing community of satisfied customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 bg-gradient-to-br ${getColorClasses(stat.color)} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <stat.icon className="text-white" size={32} />
              </div>
              <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-blue-100">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;