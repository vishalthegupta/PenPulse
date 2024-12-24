import React from 'react';
import Logo from '../../public/assets/Logo.webp';
import { Link } from 'react-router-dom';
import { UserData } from '../context/userContext';
import profilePic from '../../public/Vishal_LinkedIN.jpg'
import Cookies from "js-cookie";


const Navbar = () => {
  
   const { isAuth , logout } = UserData();
   
   // Log out 
  function logoutHandler() {
       logout();
  }

  return (
    <div className="flex bg-gradient-to-r from-blue-500 to-teal-500 justify-between items-center p-4 shadow-lg">
      {/* Left side: Logo and title */}
      <Link to={'/'} className="flex items-center space-x-3">
        <img src={Logo} alt="Logo" className="h-12 w-12 rounded-full" />
        <span className="text-white font-semibold text-2xl">PenPulse</span>
      </Link>

      {/* Right side: Auth-related buttons */}
      {isAuth ? (
        <div className="flex space-x-4">
          <Link to='/add-post' className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md shadow-md hover:scale-105 transition-all duration-200">
            + Add Post
          </Link>
          <button onClick={logoutHandler} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md shadow-md hover:scale-105 transition-all duration-200">
            Logout
          </button>
           {/* Profile Button with profilePic as background */}
           <Link 
            to={`/profile`} 
            className="w-12 h-12 rounded-full shadow-md hover:scale-105 transition-all duration-200 flex items-center justify-center"
            style={{
              backgroundImage: `url(${profilePic})`, 
              backgroundSize: 'cover', 
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </div>
      ) : (
    <>
      <div className='flex justify-end space-x-8'>
        <div>
        <Link to={'/register'} className="bg-zinc-600 hover:bg-zinc-700 text-white px-6 py-2 rounded-md shadow-md hover:scale-105 transition-all duration-200">
          Register
        </Link>
      </div>

        <div>
          <Link to={'/login'} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow-md hover:scale-105 transition-all duration-200">
            Login
          </Link>
        </div>
        </div>
    </>
      )}
    </div>
  );
};

export default Navbar;
