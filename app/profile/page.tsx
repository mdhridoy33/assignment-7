'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { user, updateProfile, logout, loading } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');

  useEffect(() => {
    if (user && user.name) {
      setName(user.name);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-gray-500">
        লোড হচ্ছে...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-600 mb-4">অনুগ্রহ করে প্রথমে সাইন ইন করুন।</p>
        <button
          onClick={() => router.push('/signin')}
          className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-medium"
        >
          সাইন ইন করুন
        </button>
      </div>
    );
  }

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name });
    toast.success('প্রোফাইল সফলভাবে আপডেট হয়েছে!');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
        <p className="text-sm text-gray-500">আপনার অ্যাকাউন্ট তথ্য এখানে দেখুন এবং পরিবর্তন করুন।</p>
      </div>

      {/* User Card */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={user.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500/30"
          />
          <div>
            <h2 className="text-lg font-bold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        <button
          onClick={() => {
            logout();
            toast.success('সফলভাবে সাইন আউট করা হয়েছে!');
            router.push('/');
          }}
          className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition"
        >
          সাইন আউট
        </button>
      </div>

      {/* Update Form */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-6">
        <h3 className="text-base font-bold text-gray-800">তথ্য পরিবর্তন</h3>
        
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">নাম</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-600 text-gray-900"
              placeholder="আপনার নাম লিখুন"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition shadow-xs text-sm"
          >
            আপডেট করুন
          </button>
        </form>
      </div>
    </div>
  );
}