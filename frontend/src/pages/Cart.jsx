import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import CartItem from '../components/Cart/CartItem';
import PaymentForm from '../components/Payment/PaymentForm';
import { ShoppingCart, ArrowLeft, Calendar, MapPin } from 'lucide-react';

const Cart = () => {
  const { cart, clearCart, createOrder, addNotification } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);
  const [orderData, setOrderData] = useState({
    pickupDate: '',
    pickupTime: '',
    deliveryDate: '',
    deliveryTime: '',
    address: user?.address || '',
    notes: ''
  });

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 4.99;
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  const handleProceedToPayment = () => {
    if (!orderData.pickupDate || !orderData.pickupTime || !orderData.address) {
      alert('Please fill in all required fields');
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentComplete = (paymentInfo) => {
    const order = createOrder({
      items: cart,
      subtotal,
      deliveryFee,
      tax,
      total,
      pickupDate: orderData.pickupDate,
      pickupTime: orderData.pickupTime,
      deliveryDate: orderData.deliveryDate,
      deliveryTime: orderData.deliveryTime,
      address: orderData.address,
      notes: orderData.notes,
      paymentInfo,
      customerId: user.id
    });

    addNotification({
      type: 'success',
      title: 'Order Placed Successfully!',
      message: `Your order #${order.id} has been placed and is being processed.`
    });

    clearCart();
    navigate('/customer/orders');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <ShoppingCart className="mx-auto mb-4 text-gray-400" size={64} />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Add some services to get started</p>
            <button
              onClick={() => navigate('/services')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Browse Services
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Cart Items */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Selected Services</h2>
              <div className="space-y-4">
                {cart.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>

            {/* Order Details */}
            {!showPayment && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pickup Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="date"
                        value={orderData.pickupDate}
                        onChange={(e) => setOrderData({...orderData, pickupDate: e.target.value})}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pickup Time *
                    </label>
                    <select
                      value={orderData.pickupTime}
                      onChange={(e) => setOrderData({...orderData, pickupTime: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select time</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">01:00 PM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="15:00">03:00 PM</option>
                      <option value="16:00">04:00 PM</option>
                      <option value="17:00">05:00 PM</option>
                      <option value="18:00">06:00 PM</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="date"
                        value={orderData.deliveryDate}
                        onChange={(e) => setOrderData({...orderData, deliveryDate: e.target.value})}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Time
                    </label>
                    <select
                      value={orderData.deliveryTime}
                      onChange={(e) => setOrderData({...orderData, deliveryTime: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select time</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">01:00 PM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="15:00">03:00 PM</option>
                      <option value="16:00">04:00 PM</option>
                      <option value="17:00">05:00 PM</option>
                      <option value="18:00">06:00 PM</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                    <textarea
                      value={orderData.address}
                      onChange={(e) => setOrderData({...orderData, address: e.target.value})}
                      rows={3}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your complete address"
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Instructions
                  </label>
                  <textarea
                    value={orderData.notes}
                    onChange={(e) => setOrderData({...orderData, notes: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Any special instructions for handling your items..."
                  />
                </div>
              </div>
            )}

            {/* Payment Form */}
            {showPayment && (
              <PaymentForm total={total} onPaymentComplete={handlePaymentComplete} />
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-fit">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-semibold text-gray-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            {!showPayment && (
              <button
                onClick={handleProceedToPayment}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors mt-6"
              >
                Proceed to Payment
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;