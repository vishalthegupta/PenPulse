import React from 'react';
import { Link } from 'react-router-dom';

const PostHeader = ({ post }) => {
  let content = post.textContent;
  content = content.substring(0, 120);
  
  return (
    <div className="flex m-6 min-w-0 flex-grow bg-gradient-to-r from-gray-100 to-slate-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
     <Link 
      to = {`/read/${post._id}`}
      className="flex flex-col p-6 bg-white border border-gray-200 rounded-lg w-full hover:scale-105 transition-transform duration-300">
        <h1 className="text-2xl font-bold text-gray-800 m-2">{post.title}</h1>
        <div className="flex justify-between items-center">
          <h4 className="text-gray-600 m-2">{content}...</h4>
          <h5 className="text-sm font-semibold text-gray-500 m-2">{post.owner.username}Vishal Gupta</h5>
        </div>
      </Link>
    </div>
  );
};

export default PostHeader;
