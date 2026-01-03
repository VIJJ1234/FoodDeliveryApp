
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RESTAURANTS } from '../services/mockData';
import { useCart } from '../context/CartContext';

const RestaurantDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const restaurant = RESTAURANTS.find(r => r.id === id);

  if (!restaurant) return <div className="p-10 text-center">Restaurant not found</div>;

  const categories = Array.from(new Set(restaurant.menu.map(item => item.category)));

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Cover Image */}
      <div className="h-64 relative">
        <img src={restaurant.image} className="w-full h-full object-cover" alt={restaurant.name} />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute bottom-6 left-6 text-white max-w-7xl mx-auto px-4 w-full">
          <h1 className="text-4xl font-extrabold mb-2">{restaurant.name}</h1>
          <div className="flex items-center space-x-4 text-sm font-medium">
            <span className="bg-white text-gray-900 px-2 py-0.5 rounded flex items-center">
              ★ {restaurant.rating}
            </span>
            <span>{restaurant.deliveryTime} mins delivery</span>
            <span>Min. Order Rs{restaurant.minOrder}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
        {/* Menu Section */}
        <div className="flex-grow">
          <div className="mb-8 overflow-x-auto whitespace-nowrap space-x-6 border-b pb-4">
            {categories.map(cat => (
              <a key={cat} href={`#${cat}`} className="text-gray-600 font-bold hover:text-orange-600 uppercase tracking-wider text-sm">
                {cat}
              </a>
            ))}
          </div>

          {categories.map(cat => (
            <div key={cat} id={cat} className="mb-10">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">{cat}</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {restaurant.menu.filter(item => item.category === cat).map(item => (
                  <div key={item.id} className="bg-white p-4 rounded-xl border flex gap-4 hover:shadow-md transition">
                    <div className="flex-grow">
                      <div className="flex items-center mb-1">
                         <span className={`w-3 h-3 border ${item.isVeg ? 'border-green-600 flex items-center justify-center' : 'border-red-600 flex items-center justify-center'} mr-2`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-green-600' : 'bg-red-600'}`}></span>
                         </span>
                         <h3 className="font-bold text-lg">{item.name}</h3>
                      </div>
                      <p className="text-gray-500 text-sm mb-3 line-clamp-2">{item.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-900">${item.price}</span>
                        <button 
                          onClick={() => addItem(item, restaurant.id, restaurant.name)}
                          className="px-6 py-1.5 bg-orange-50 text-orange-600 border border-orange-200 rounded-lg font-bold hover:bg-orange-600 hover:text-white transition uppercase text-xs"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                    {item.image && (
                      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Mini Cart / Info Sidebar */}
        <div className="w-full md:w-80 flex-shrink-0">
          <div className="bg-white p-6 rounded-2xl shadow-sm sticky top-24">
            <h3 className="text-lg font-bold mb-4">Cart Preview</h3>
            <CartSummary />
            <button 
              onClick={() => navigate('/cart')}
              className="w-full mt-4 bg-orange-600 text-white py-3 rounded-xl font-bold hover:bg-orange-700 shadow-md"
            >
              Go to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartSummary = () => {
  const { items, total } = useCart();
  if (items.length === 0) return <p className="text-gray-400 text-sm">Your cart is empty</p>;
  return (
    <div className="space-y-3">
      {items.map(item => (
        <div key={item.id} className="flex justify-between text-sm">
          <span className="text-gray-600">{item.quantity} x {item.name}</span>
          <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      ))}
      <div className="border-t pt-3 flex justify-between font-bold">
        <span>Subtotal</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default RestaurantDetails;
