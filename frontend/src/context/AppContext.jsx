import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [services, setServices] = useState([]);
  const [providers, setProviders] = useState([]);
  const [cart, setCart] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Initialize with sample data
    initializeData();
    console.log('Initializing data...');
  }, []);

  const initializeData = () => {
    const sampleServices = [
      {
        id: 1,
        name: 'Wash & Fold',
        price: 2.50,
        unit: 'per kg',
        description: 'Regular washing and folding service',
        duration: '24 hours',
        icon: '🧺'
      },
      {
        id: 2,
        name: 'Dry Cleaning',
        price: 8.99,
        unit: 'per item',
        description: 'Professional dry cleaning service',
        duration: '48 hours',
        icon: '👔'
      },
      {
        id: 3,
        name: 'Ironing',
        price: 1.99,
        unit: 'per item',
        description: 'Professional ironing service',
        duration: '12 hours',
        icon: '🔥'
      },
      {
        id: 4,
        name: 'Stain Removal',
        price: 5.99,
        unit: 'per item',
        description: 'Specialized stain removal treatment',
        duration: '24 hours',
        icon: '✨'
      }
    ];

    const sampleProviders = [
      {
        id: 1,
        name: 'CleanCo Laundry',
        address: '123 Main St, Downtown',
        rating: 4.8,
        reviews: 245,
        distance: '0.5 km',
        services: [1, 2, 3, 4],
        hours: '7:00 AM - 10:00 PM',
        phone: '(555) 123-4567'
      },
      {
        id: 2,
        name: 'Fresh & Clean',
        address: '456 Oak Ave, Uptown',
        rating: 4.6,
        reviews: 189,
        distance: '1.2 km',
        services: [1, 2, 3],
        hours: '6:00 AM - 11:00 PM',
        phone: '(555) 987-6543'
      },
      {
        id: 3,
        name: 'Spotless Cleaners',
        address: '789 Pine Rd, Midtown',
        rating: 4.9,
        reviews: 312,
        distance: '2.1 km',
        services: [1, 2, 4],
        hours: '8:00 AM - 9:00 PM',
        phone: '(555) 456-7890'
      }
    ];

    setServices(sampleServices);
    setProviders(sampleProviders);
    console.log('Sample providers:', sampleProviders);
    console.log('Sample services:', sampleServices);
  };

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(cartItem => cartItem.id === item.id);
      if (existing) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const updateCartQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const createOrder = (orderData) => {
    const newOrder = {
      id: Date.now(),
      ...orderData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      trackingUpdates: [
        {
          status: 'pending',
          timestamp: new Date().toISOString(),
          message: 'Order placed successfully'
        }
      ]
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId, status, message) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId
          ? {
              ...order,
              status,
              trackingUpdates: [
                ...order.trackingUpdates,
                {
                  status,
                  timestamp: new Date().toISOString(),
                  message
                }
              ]
            }
          : order
      )
    );
  };

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      ...notification,
      timestamp: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const value = {
    orders,
    services,
    providers,
    cart,
    notifications,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    createOrder,
    updateOrderStatus,
    addNotification,
    markNotificationAsRead
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};