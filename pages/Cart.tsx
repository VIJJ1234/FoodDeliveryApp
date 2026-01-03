
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { items, updateQuantity, removeItem, total } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/restaurants" className="bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700">
          Find Restaurants
        </Link>
      </div>
    );
  }

  const deliveryFee = 5.00;
  const platformFee = 2.00;
  const grandTotal = total + deliveryFee + platformFee;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {items.map(item => (
            <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border flex items-center gap-6">
              <img src={item.image} className="w-20 h-20 rounded-lg object-cover" alt={item.name} />
              <div className="flex-grow">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-gray-500 text-sm">{item.restaurantName}</p>
                <button 
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 text-xs font-bold mt-2 hover:underline"
                >
                  REMOVE
                </button>
              </div>
              <div className="flex items-center border rounded-lg px-2 py-1">
                <button onClick={() => updateQuantity(item.id, -1)} className="px-2 text-xl">-</button>
                <span className="px-4 font-bold">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} className="px-2 text-xl text-orange-600">+</button>
              </div>
              <div className="text-right min-w-[80px]">
                <span className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border sticky top-24">
            <h3 className="text-xl font-bold mb-6">Bill Details</h3>
            <div className="space-y-4 text-gray-600">
              <div className="flex justify-between">
                <span>Item Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Partner Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Platform Fee</span>
                <span>${platformFee.toFixed(2)}</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-extrabold text-gray-900 text-xl">
                <span>TO PAY</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full mt-8 bg-orange-600 text-white py-4 rounded-xl font-bold hover:bg-orange-700 shadow-lg transition"
            >
              Proceed to Checkout
            </button>
            <p className="text-xs text-center text-gray-400 mt-4">
              Secure checkout powered by QuickPay
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
