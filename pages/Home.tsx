
import React from 'react';
import { Link } from 'react-router-dom';
import { RESTAURANTS } from '../services/mockData';
import RestaurantCard from '../components/RestaurantCard';

const Home: React.FC = () => {
  const featured = RESTAURANTS.filter(r => r.featured);
  // const categories = ['Burgers','Indian','chinese','pasta', 'Sushi', 'Pizza', 'Italian', 'Asian', 'Healthy'];
  interface CuisineCategory {
  name: string;
  image: string;
}

 const categories: CuisineCategory[] = [
  {
    name: "Burgers",
    image: "/images/cuisines/burger.png",
  },
  {
    name: "Indian",
    image: "/images/cuisines/indian.png",
  },
  {
    name: "Chinese",
    image: "/images/cuisines/chinese.png",
  },
  {
    name: "Pasta",
    image: "/images/cuisines/pasta.png",
  },
  {
    name: "Sushi",
    image: "/images/cuisines/sushi.png",
  },
  {
    name: "Pizza",
    image: "/images/cuisines/pizza.png",
  },
  {
    name: "Italian",
    image: "/images/cuisines/italian.png",
  },
  // {
  //   name: "Asian",
  //   image: "/images/cuisines/asian.png",
  // },
  {
    name: "Healthy",
    image: "/images/cuisines/healthy.png",
  },
];


  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center bg-orange-600 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://cdn.magicdecor.in/com/2023/11/15111430/Indian-Food-Platter-Wallpaper-for-Wall-M.jpg" 
            className="w-full h-full object-cover opacity-30 mix-blend-overlay" 
            alt="Hero bg" 
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white w-full">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Delicious Food, <br />
              <span className="text-orange-200">Delivered To You.</span>
            </h1>
            <p className="text-xl mb-8 text-orange-50 opacity-90">
              The best restaurants in your city, delivered in under 30 minutes. 
              Satisfy your cravings with FoodApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/restaurants" 
                className="bg-white text-orange-600 px-8 py-4 rounded-xl font-bold text-center hover:bg-orange-50 transition shadow-lg"
              >
                Order Now
              </Link>
              <Link 
                to="/signup" 
                className="bg-orange-500 text-white px-8 py-4 rounded-xl font-bold text-center border-2 border-orange-400 hover:bg-orange-400 transition"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-8 text-center">
          View restaurants by cuisine type
        </h2>

        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((cat: CuisineCategory) => (
            <Link
              key={cat.name}
              to={`/restaurants?cuisine=${cat.name}`}
              className="flex flex-col items-center min-w-[120px] flex-shrink-0 group"
            >
              <div
                className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center 
                           overflow-hidden transition-transform duration-200 group-hover:scale-105"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-14 h-14 object-contain"
                />
              </div>

              <span className="mt-3 font-medium text-gray-700 group-hover:text-orange-600 transition">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>

      {/* Featured Restaurants */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold">Featured Restaurants</h2>
            <p className="text-gray-500">Hand-picked favorites just for you</p>
          </div>
          <Link to="/restaurants" className="text-orange-600 font-bold hover:underline">View All</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map(r => (
            <RestaurantCard key={r.id} restaurant={r} />
          ))}
        </div>
      </section>

      {/* Simple CTA */}
      <section className="bg-gray-900 py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Want to partner with us?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">Join thousands of restaurants that use QuickBite to boost their revenue and reach more customers.</p>
          <button className="bg-orange-600 px-8 py-3 rounded-lg font-bold hover:bg-orange-700 transition">Get Started</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
