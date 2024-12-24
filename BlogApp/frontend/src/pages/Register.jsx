import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserData } from '../context/userContext'

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');

  const { register } = UserData();


  const handleSubmit = (e) => {
    e.preventDefault();
    register(username , email , password , gender)
    console.log("Username:", username, "Email:", email, "Password:", password, "Gender:", gender);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-teal-50">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg mx-12 my-8">
        <h1 className="text-center text-3xl font-semibold text-blue-700 mb-6">Create an Account</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div className="flex flex-col">
            <label htmlFor="username" className="text-lg font-medium text-gray-600 mb-2">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter Username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
            />
          </div>

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

          {/* Gender Selection */}
          <div className="flex flex-col">
            <label htmlFor="gender" className="text-lg font-medium text-gray-600 mb-2">Gender</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="p-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
            >
              <option value="">Select Gender...</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Prefer Not to Say</option>
            </select>
          </div>

          {/* Register Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md shadow-md hover:scale-105 transition-all duration-200"
            >
              Register
            </button>
          </div>
          
          {/* Link to Login */}
          <div className="flex justify-center mt-4 text-sm text-gray-600">
            <span>Already have an account? </span>
            <Link to="/login" className="text-blue-600 hover:underline">&nbsp; Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
