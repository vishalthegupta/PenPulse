import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { PostData } from '../context/postContext';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdatePost = () => {

   const { id } = useParams();
   const { updatePost } = PostData();
   
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
    

  async function getPostData() {
    try {
     const response = await axios.get(`http://localhost:4000/api/post/` + id)
    //  console.log(response.data)
    setTitle(response.data.post.title)
    setText(response.data.post.textContent)
    } catch (error) {
      return toast.error(error.message)
    }
}


useEffect(() => {
getPostData()
} , [])




   async function updateHandler() {
      updatePost(id , title , text)
   }

  


  const handleSubmit = () => {
    if (title.length === 0 && text.length === 0) {
      return toast.error('Please Write Something');
    }

    updatePost(postId, title, text);
  };

  return (
    <div className="flex flex-col bg-gradient-to-r from-blue-50 to-teal-50 p-8 rounded-lg shadow-lg mx-12 my-8">
      <h1 className="text-center text-3xl font-semibold text-gray-700 mb-6">Create a New Post</h1>

      {/* Title Input */}
      <div className="flex flex-col mb-6">
        <label htmlFor="title" className="text-lg font-medium text-gray-600 mb-2">Title</label>
        <input
          id="title"
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
      </div>

      {/* Text Input */}
      <div className="flex flex-col mb-6">
        <label htmlFor="text" className="text-lg font-medium text-gray-600 mb-2">Text</label>
        <textarea
          id="text"
          placeholder="Enter Text..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows="8"
          className="p-3 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          onClick={updateHandler}
          className="bg-zinc-600 hover:bg-zinc-700 text-white px-8 py-3 rounded-md shadow-md hover:scale-105 transition-all duration-200"
        >
          Update Post
        </button>
      </div>
    </div>
  );
};

export default UpdatePost;
