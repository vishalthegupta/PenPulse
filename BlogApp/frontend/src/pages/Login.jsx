import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { UserData } from '../context/userContext';

const Login = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const  { login } = UserData();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email , password);
    setEmail('')
    setPassword('')
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-teal-50">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg mx-12 my-8">
        <h1 className="text-center text-3xl font-semibold text-blue-700 mb-6">Login to Your Account</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
       

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-lg font-medium text-gray-600 mb-2">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-lg font-medium text-gray-600 mb-2">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
            />
          </div>

       
          {/* Login Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md shadow-md hover:scale-105 transition-all duration-200"
            >
              Login
            </button>
          </div>
          
          {/* Link to Login */}
          <div className="flex justify-center mt-4 text-sm text-gray-600">
            <span>Don't have an account? </span>
            <Link to="/register" className="text-blue-600 hover:underline">&nbsp; Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login
