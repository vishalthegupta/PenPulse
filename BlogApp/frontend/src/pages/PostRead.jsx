import React , { useState }from 'react';
import { Link, useParams } from 'react-router-dom'
import { FaSadTear } from 'react-icons/fa';
import { PostData }  from '../context/postContext'
import { useEffect } from 'react';
import toast from 'react-hot-toast'
import axios from 'axios'
import { format } from "date-fns";

const PostRead = () => {

   const  { id }  = useParams();
   
   const[post , setPost] = useState('')
  
   async function fetchPost() {
      try {
        const response = await axios.get(`http://localhost:4000/api/post/` + id , 
          { withCredentials: true } 
          )  
  
          const data = response.data.post;
          setPost(data);
      } catch (error) {
          console.log(error)
          return toast.error("Could not fetch post")
      }
   }

   useEffect(() => {
    fetchPost()
   } , [])


   if (!post) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-200">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
          <FaSadTear className="text-6xl text-blue-500 mb-4" />
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">Post Not Found</h1>
          <p className="text-lg text-gray-600 mb-4">
            Oops! We couldn't find the post you're looking for. Please try again later.
          </p>
          <button 
            onClick={() => window.history.back()}  // Go back to the previous page
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="mx-auto bg-gradient-to-r from-blue-50 to-teal-50 px-8 py-8 rounded-lg shadow-lg my-8">
      <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        {/* Title */}
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 hover:text-blue-600 transition-colors duration-300">
          {post.title}
        </h1>

        {/* Author and Date */}
        <div className="flex justify-between items-center text-sm text-gray-600 mb-8">
          <Link className="font-semibold">{post.owner.username} </Link>
          <span className="text-gray-500">{format(new Date(post.createdAt), "MMMM do")}</span>
        </div>
        {/* Post Content */}
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          {post.textContent}
        </p>
      </div>
    </div>
  );
};

export default PostRead;
