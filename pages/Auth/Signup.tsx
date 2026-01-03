
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(formData);
      navigate('/');
    } catch (err) {
      alert('Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100-64px)] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-orange-600 mb-2">QuickBite</h1>
          <p className="text-gray-500 font-medium">Join our foodie community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              required
              className="w-full p-3.5 border rounded-2xl outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full p-3.5 border rounded-2xl outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number</label>
            <input 
              type="tel" 
              required
              className="w-full p-3.5 border rounded-2xl outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="555-0123"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              required
              className="w-full p-3.5 border rounded-2xl outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full py-4 mt-2 bg-orange-600 text-white rounded-2xl font-bold text-lg hover:bg-orange-700 transition shadow-lg ${loading && 'opacity-70 cursor-not-allowed'}`}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-8 text-center text-gray-500">
          Already have an account? <Link to="/login" className="text-orange-600 font-bold hover:underline">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
