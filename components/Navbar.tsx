
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const cartCount = items.reduce((a, b) => a + b.quantity, 0);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-orange-600">QuickBite</Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-orange-600 transition">Home</Link>
            <Link to="/restaurants" className="text-gray-600 hover:text-orange-600 transition">Restaurants</Link>
            {user ? (
              <>
                <Link to="/orders" className="text-gray-600 hover:text-orange-600 transition">My Orders</Link>
                <Link to="/profile" className="text-gray-600 hover:text-orange-600 transition">Profile</Link>
                <button 
                  onClick={logout}
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition">Login</Link>
            )}
            <Link to="/cart" className="relative p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
             <Link to="/cart" className="relative p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t px-4 py-2 space-y-2 pb-4">
          <Link to="/" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/restaurants" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>Restaurants</Link>
          {user ? (
            <>
              <Link to="/orders" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>My Orders</Link>
              <Link to="/profile" className="block py-2 text-gray-600" onClick={() => setIsOpen(false)}>Profile</Link>
              <button onClick={() => { logout(); setIsOpen(false); }} className="block w-full text-left py-2 text-orange-600 font-medium">Logout</button>
            </>
          ) : (
            <Link to="/login" className="block py-2 text-orange-600 font-medium" onClick={() => setIsOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
