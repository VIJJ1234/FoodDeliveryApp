
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <h2 className="text-2xl font-bold text-orange-600 mb-4">QuickBite</h2>
            <p className="text-gray-500 text-sm">
              Providing high-quality food delivery services since 2024. Your satisfaction is our priority.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/" className="hover:text-orange-600">Home</Link></li>
              <li><Link to="/restaurants" className="hover:text-orange-600">Browse Restaurants</Link></li>
              <li><Link to="/cart" className="hover:text-orange-600">View Cart</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Account</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/profile" className="hover:text-orange-600">My Profile</Link></li>
              <li><Link to="/orders" className="hover:text-orange-600">Order History</Link></li>
              <li><Link to="/signup" className="hover:text-orange-600">Create Account</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Email: support@QuickBite.com</li>
              <li>Phone: +91 7989791060</li>
              <li>Address: 123 Main St, Foodie Central,Bengaluru</li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>© 2026 QuickBite fooddelivery. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-600">Privacy Policy</a>
            <a href="#" className="hover:text-gray-600">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
