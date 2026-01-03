
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { OrderStatus } from '../types';

const Checkout: React.FC = () => {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState(user?.address || '');
  const [loading, setLoading] = useState(false);

  if (!items.length) {
    navigate('/cart');
    return null;
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return alert('Please enter delivery address');
    
    setLoading(true);
    // Simulate Order API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newOrder = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user?.id || 'guest',
      items,
      total: total + 7.00,
      status: OrderStatus.PENDING,
      date: new Date().toISOString(),
      address,
      restaurantName: items[0].restaurantName
    };

    const existingOrders = JSON.parse(localStorage.getItem('qb_orders') || '[]');
    localStorage.setItem('qb_orders', JSON.stringify([newOrder, ...existingOrders]));
    
    clearCart();
    setLoading(false);
    navigate('/orders');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <form onSubmit={handlePlaceOrder} className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border shadow-sm">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="bg-orange-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">1</span>
              Delivery Address
            </h3>
            <textarea 
              className="w-full p-4 border rounded-xl outline-none focus:ring-2 focus:ring-orange-500 h-32"
              placeholder="Full address where you'd like your food delivered..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="bg-white p-6 rounded-2xl border shadow-sm">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="bg-orange-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs mr-2">2</span>
              Payment Method
            </h3>
            <div className="space-y-3">
              <label className="flex items-center p-3 border rounded-xl cursor-pointer hover:bg-gray-50">
                <input type="radio" name="payment" defaultChecked className="text-orange-600 focus:ring-orange-500" />
                <span className="ml-3 font-medium">Cash on Delivery</span>
              </label>
              <label className="flex items-center p-3 border rounded-xl cursor-pointer hover:bg-gray-50 opacity-50">
                <input type="radio" name="payment" disabled className="text-orange-600 focus:ring-orange-500" />
                <span className="ml-3 font-medium">Credit / Debit Card (Offline)</span>
              </label>
            </div>
          </div>
        </form>

        <div className="bg-white p-6 rounded-2xl border shadow-sm h-fit sticky top-24">
          <h3 className="text-xl font-bold mb-6">Order Summary</h3>
          <div className="space-y-4 max-h-60 overflow-y-auto mb-6 pr-2">
            {items.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-gray-600">{item.quantity} x {item.name}</span>
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Delivery & Platform Fee</span>
              <span>$ 7.00</span>
            </div>
            <div className="flex justify-between font-bold text-xl pt-2">
              <span>Total</span>
              <span>${(total + 7.00).toFixed(2)}</span>
            </div>
          </div>
          <button 
            onClick={handlePlaceOrder}
            disabled={loading}
            className={`w-full mt-8 py-4 rounded-xl font-bold text-white shadow-lg transition ${loading ? 'bg-orange-400 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700'}`}
          >
            {loading ? 'Placing Order...' : 'Confirm Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
