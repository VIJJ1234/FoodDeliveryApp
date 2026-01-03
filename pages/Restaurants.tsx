
import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RESTAURANTS } from '../services/mockData';
import RestaurantCard from '../components/RestaurantCard';

const Restaurants: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [minOrderFilter, setMinOrderFilter] = useState(0);
  const cuisineParam = searchParams.get('cuisine');

  const filteredRestaurants = useMemo(() => {
    return RESTAURANTS.filter(r => {
      const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           r.cuisine.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCuisine = !cuisineParam || r.cuisine.includes(cuisineParam);
      const matchesMinOrder = r.minOrder >= minOrderFilter;
      return matchesSearch && matchesCuisine && matchesMinOrder;
    });
  }, [searchTerm, cuisineParam, minOrderFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold">Restaurants in your area</h1>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-grow">
            <input 
              type="text" 
              placeholder="Search cuisine or restaurant..." 
              className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <select 
            className="border rounded-xl px-4 py-2 bg-white outline-none focus:ring-2 focus:ring-orange-500"
            value={minOrderFilter}
            onChange={(e) => setMinOrderFilter(Number(e.target.value))}
          >
            <option value="0">Any Min Order</option>
            <option value="15">$15+</option>
            <option value="25">$25+</option>
            <option value="35">$35+</option>
          </select>
        </div>
      </div>

      {cuisineParam && (
        <div className="mb-6 flex items-center">
          <span className="text-gray-500 mr-2">Filtering by:</span>
          <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-bold flex items-center">
            {cuisineParam}
            <button 
              onClick={() => {
                const newParams = new URLSearchParams(searchParams);
                newParams.delete('cuisine');
                setSearchParams(newParams);
              }}
              className="ml-2 hover:text-orange-800"
            >✕</button>
          </span>
        </div>
      )}

      {filteredRestaurants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRestaurants.map(r => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
          <div className="text-6xl mb-4">🍕</div>
          <h2 className="text-xl font-bold text-gray-800">No restaurants found</h2>
          <p className="text-gray-500">Try adjusting your search or filters</p>
          <button 
            onClick={() => { setSearchTerm(''); setMinOrderFilter(0); setSearchParams({}); }}
            className="mt-6 text-orange-600 font-bold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Restaurants;
