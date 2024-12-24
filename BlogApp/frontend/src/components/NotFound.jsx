import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSadTear } from "react-icons/fa";

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-200">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
        <FaSadTear className="text-6xl text-blue-500 mb-4" />
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h1>
        <p className="text-lg text-gray-600 mb-4">
          Sorry, the page you are looking for isn't available. Please restart the app.
        </p>
        <button 
          onClick={() => navigate("/")}  // Navigate to homepage
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Visit Homepage
        </button>
      </div>
    </div>
  );
};

export default NotFound;
