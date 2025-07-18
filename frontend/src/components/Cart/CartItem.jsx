import React from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, Minus, Trash2 } from 'lucide-react';

const CartItem = ({ item }) => {
  const { updateCartQuantity, removeFromCart } = useApp();

  const handleQuantityChange = (newQuantity) => {
    updateCartQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
          <span className="text-white text-xl">{item.icon}</span>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{item.name}</h3>
          <p className="text-sm text-gray-600">{item.providerName}</p>
          <p className="text-sm font-medium text-blue-600">${item.price} {item.unit}</p>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
          >
            <Minus size={14} />
          </button>
          <span className="w-8 text-center font-medium">{item.quantity}</span>
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
          >
            <Plus size={14} />
          </button>
        </div>

        <div className="text-right">
          <p className="font-semibold text-gray-900">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>

        <button
          onClick={handleRemove}
          className="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-full flex items-center justify-center transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;