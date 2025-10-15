'use client';
import { useState, useEffect, useContext } from 'react';
import API from '../api/axios';
import { DeviceContext } from '../context/DeviceContext';

export default function Navbar() {
  const { user, setUser } = useContext(DeviceContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser && savedUser !== 'undefined') setUser(JSON.parse(savedUser));
    } catch (err) {
      console.error('Failed to parse user from localStorage', err);
      localStorage.removeItem('user');
    }
  }, [setUser]);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async e => {
    e.preventDefault();
    try {
      await API.post('/auth/register', formData);
      alert('Registration successful! You can now login.');
      setShowRegister(false);
      setFormData({ name: '', email: '', password: '' });
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email: formData.email, password: formData.password });
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      setShowLogin(false);
      setFormData({ name: '', email: '', password: '' });
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  // Modal wrapper
  const Modal = ({ children, onClose }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );

  const Input = ({ label, ...props }) => (
    <label className="block mb-3 text-sm font-medium text-gray-700">
      {label}
      <input {...props} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
    </label>
  );

  return (
    <div className="bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="font-bold text-3xl text-black">SmartHome</div>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="text-sm text-gray-600"><strong>{user.name}</strong></span>
              <button
                onClick={handleLogout}
                className="px-4 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setShowLogin(true)}
                className="px-4 py-1 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
                Login
              </button>
              <button
                onClick={() => setShowRegister(true)}
                className="px-4 py-1 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>

      {/* Login Modal */}
      {showLogin && (
        <Modal onClose={() => setShowLogin(false)}>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Login</h3>
          <form onSubmit={handleLogin}>
            <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required />
            <div className="flex justify-end gap-2 mt-4">
              <button type="button" onClick={() => setShowLogin(false)} className="px-4 py-1 rounded-lg border hover:bg-gray-50 transition">Cancel</button>
              <button type="submit" className="px-4 py-1 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">Login</button>
            </div>
          </form>
        </Modal>
      )}

      {/* Register Modal */}
      {showRegister && (
        <Modal onClose={() => setShowRegister(false)}>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Register</h3>
          <form onSubmit={handleRegister}>
            <Input label="Name" name="name" type="text" value={formData.name} onChange={handleChange} required />
            <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required />
            <div className="flex justify-end gap-2 mt-4">
              <button type="button" onClick={() => setShowRegister(false)} className="px-4 py-1 rounded-lg border hover:bg-gray-50 transition">Cancel</button>
              <button type="submit" className="px-4 py-1 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition">Register</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
