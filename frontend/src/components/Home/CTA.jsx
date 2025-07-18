import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Experience Premium Laundry Service?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Join thousands of satisfied customers who trust us with their laundry needs. 
            Book your first order today and experience the difference.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors group"
            >
              Get Started
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <Download className="mr-2" size={20} />
              View Services
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Book Online</h3>
              <p className="text-gray-400">Schedule pickup at your convenience</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">We Clean</h3>
              <p className="text-gray-400">Professional cleaning with care</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Delivery</h3>
              <p className="text-gray-400">Fresh clothes delivered to your door</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;