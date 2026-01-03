
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Order, OrderStatus } from '../types';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('qb_orders') || '[]');
    setOrders(saved);
  }, []);

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">No orders found</h2>
        <p className="text-gray-500 mb-8">You haven't placed any orders yet.</p>
        <Link to="/restaurants" className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold">Start Ordering</Link>
      </div>
    );
  }

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.DELIVERED: return 'text-green-600 bg-green-50';
      case OrderStatus.OUT_FOR_DELIVERY: return 'text-blue-600 bg-blue-50';
      default: return 'text-orange-600 bg-orange-50';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      <div className="space-y-6">
        {orders.map(order => (
          <div key={order.id} className="bg-white rounded-2xl border shadow-sm p-6 overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b pb-4 gap-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800">{order.restaurantName}</h3>
                <p className="text-sm text-gray-400">Order #{order.id} • {new Date(order.date).toLocaleDateString()}</p>
              </div>
              <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
            
            <div className="space-y-3 mb-6">
              {order.items.map(item => (
                <div key={item.id} className="flex justify-between text-sm text-gray-600">
                  <span>{item.quantity} x {item.name}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center bg-gray-50 -mx-6 -mb-6 p-6">
              <span className="font-bold text-lg">Total Paid: ${order.total.toFixed(2)}</span>
              <div className="flex gap-4">
                <button className="text-orange-600 font-bold text-sm hover:underline">Rate Order</button>
                <button className="bg-white border px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-100 transition">Reorder</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
