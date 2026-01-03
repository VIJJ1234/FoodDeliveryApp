
import React from 'react';
import { Link } from 'react-router-dom';
import { Restaurant } from '../types';
import { useAuth } from '../context/AuthContext';

interface Props {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<Props> = ({ restaurant }) => {
  const { user, toggleFavorite } = useAuth();
  const isFav = user?.favorites.includes(restaurant.id);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition group relative">
      <Link to={`/restaurant/${restaurant.id}`}>
        <div className="relative h-48 overflow-hidden">
          <img 
            src={restaurant.image} 
            alt={restaurant.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
          />
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-semibold">
            {restaurant.deliveryTime} min
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-lg font-bold truncate">{restaurant.name}</h3>
            <div className="flex items-center text-orange-500 bg-orange-50 px-1.5 py-0.5 rounded text-sm font-bold">
              <span>★</span>
              <span className="ml-1 text-gray-800">{restaurant.rating}</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 truncate mb-3">{restaurant.cuisine.join(', ')}</p>
          <div className="flex justify-between items-center text-xs text-gray-400 font-medium">
            <span>Min. order ${restaurant.minOrder}</span>
            <span className="flex items-center text-green-600">
              <span className="w-1 h-1 bg-green-600 rounded-full mr-1.5"></span>
              Free Delivery
            </span>
          </div>
        </div>
      </Link>
      <button 
        onClick={(e) => { e.preventDefault(); toggleFavorite(restaurant.id); }}
        className={`absolute top-2 left-2 p-1.5 rounded-full transition ${isFav ? 'bg-orange-600 text-white' : 'bg-white/80 text-gray-400 hover:text-orange-600'}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={isFav ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
    </div>
  );
};

export default RestaurantCard;
