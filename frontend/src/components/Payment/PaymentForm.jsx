import React, { useState } from 'react';
import { CreditCard, Calendar, Lock, User } from 'lucide-react';

const PaymentForm = ({ total, onPaymentComplete }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      onPaymentComplete({
        method: paymentMethod,
        amount: total,
        transactionId: 'TXN' + Date.now(),
        status: 'completed'
      });
    }, 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Payment Information</h3>
      
      <div className="mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setPaymentMethod('card')}
            className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
              paymentMethod === 'card' 
                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <CreditCard className="mx-auto mb-2" size={20} />
            Credit/Debit Card
          </button>
          <button
            onClick={() => setPaymentMethod('wallet')}
            className={`flex-1 py-3 px-4 rounded-lg border-2 transition-colors ${
              paymentMethod === 'wallet' 
                ? 'border-blue-500 bg-blue-50 text-blue-700' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            Digital Wallet
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {paymentMethod === 'card' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Number
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={cardData.number}
                  onChange={(e) => setCardData({...cardData, number: e.target.value})}
                  placeholder="1234 5678 9012 3456"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={cardData.expiry}
                    onChange={(e) => setCardData({...cardData, expiry: e.target.value})}
                    placeholder="MM/YY"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVV
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={cardData.cvv}
                    onChange={(e) => setCardData({...cardData, cvv: e.target.value})}
                    placeholder="123"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cardholder Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={cardData.name}
                  onChange={(e) => setCardData({...cardData, name: e.target.value})}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </>
        )}

        {paymentMethod === 'wallet' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="p-4 border border-gray-300 rounded-lg hover:border-blue-500 transition-colors"
              >
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-600 rounded mx-auto mb-2"></div>
                  <span className="text-sm font-medium">PayPal</span>
                </div>
              </button>
              <button
                type="button"
                className="p-4 border border-gray-300 rounded-lg hover:border-blue-500 transition-colors"
              >
                <div className="text-center">
                  <div className="w-8 h-8 bg-green-600 rounded mx-auto mb-2"></div>
                  <span className="text-sm font-medium">Google Pay</span>
                </div>
              </button>
            </div>
          </div>
        )}

        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-gray-900">Total:</span>
            <span className="text-2xl font-bold text-blue-600">${total.toFixed(2)}</span>
          </div>
          
          <button
            type="submit"
            disabled={processing}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {processing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;