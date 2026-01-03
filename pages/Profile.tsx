
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    updateProfile({ name, phone, address });
    setSaving(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-1">
          <div className="bg-white p-6 rounded-2xl border text-center shadow-sm">
            <div className="w-24 h-24 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-4xl font-bold mx-auto mb-4">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-xl font-bold">{user?.name}</h2>
            <p className="text-gray-500 text-sm mb-6">{user?.email}</p>
            <div className="text-left border-t pt-4 space-y-4">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Favorites</p>
                <p className="text-sm font-medium">{user?.favorites.length || 0} Restaurants</p>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">Preferences</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {user?.preferences.map(p => (
                    <span key={p} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">{p}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border shadow-sm space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                <input 
                  type="text" 
                  className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <input 
                type="email" 
                className="w-full p-3 border rounded-xl bg-gray-50 text-gray-400"
                value={user?.email}
                disabled
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Delivery Address</label>
              <textarea 
                className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-orange-500 h-24"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </div>
            <button 
              type="submit" 
              disabled={saving}
              className={`bg-orange-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-700 transition shadow-md ${saving && 'opacity-70 cursor-not-allowed'}`}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
