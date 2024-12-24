import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UserData } from '../context/userContext'
import toast from 'react-hot-toast';
import { PostData } from '../context/postContext';
import profilePic from '../../public/Vishal_LinkedIN.jpg'


const Profile = () => {
  // const { user } = UserData();
  
  const { deletePost } = PostData()
  
  const { fetchUserData ,  user , setUsername , username , setEmail , email , setPosts , posts } = UserData();
 

 
  useEffect(() => {
    fetchUserData();
  } , [])

  // This will run everytime there is any change in post and user
  useEffect(() => {
    fetchUserData();
  } , [posts , user])


  

  const handleDeletePost = (postId , postTitle) => {
    deletePost(postId)
    toast.success(`Deleted the Post : ${postTitle}`);
    fetchUserData();
  };


  return (
   <>
    <div className="container mx-auto p-6 bg-indigo-50 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 mt-6">
    {/* Fist Part */}
    <div className="flex justify-between items-start bg-white p-6 rounded-lg shadow-md border border-gray-200">
      {/* Profile Header - Left Side */}
      <div className="flex items-center space-x-6">
        <img
          className="w-32 h-32 rounded-full border-4 border-orange-100 transform transition-transform hover:scale-105"
          src={profilePic}
          alt="Profile"
        />
        <div>
          <h1 className="text-4xl font-bold text-gray-800 hover:text-indigo-600 transition-colors duration-300">
           {username}
          </h1>
          <p className="text-lg text-gray-500">{email}</p>
        </div>
      </div>
  
      {/* Followers and Following - Right Side */}
      <div className="flex space-x-8">
        {/* Followers */}
        <div className="flex flex-col items-center space-y-2 p-4 rounded-lg hover:bg-green-100 transition-colors duration-300">
          <p className="text-xl font-semibold text-gray-800">Followers</p>
          <p className="text-3xl text-pink-600">2890M</p>
        </div>
        {/* Following */}
        <div className="flex flex-col items-center space-y-2 p-4 rounded-lg hover:bg-blue-100 transition-colors duration-300">
          <p className="text-xl font-semibold text-gray-800">Following</p>
          <p className="text-3xl text-blue-600">6</p>
        </div>
      </div>
    </div>
    </div>

     {/* Second Part -  Posts   */}
      <div className="container mx-auto p-6 bg-gradient-to-r from-indigo-100 to-slate-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 mt-6">
      <h2 className="text-2xl font-semibold mb-4">My Posts</h2>
      {posts.length > 0 ? 
      posts.map((post, index) => (
        <div key={post._id} className="bg-white p-4 mb-4 rounded-lg shadow-md">
          <div className="flex justify-between">
            <div>
              <h3 className="text-xl font-semibold">{post.title}</h3>
              {/* <p className="text-sm text-gray-500">{post.date}</p> */}
              <p className="mt-2 text-gray-700">
              {post.textContent.split(' ').slice(0, 45).join(' ')}...
              </p>
            </div>
            <img
              className="w-32 h-32 object-cover rounded-lg"
              src={profilePic}
              alt="Post"
            />
          </div>
          <div className="mt-4 flex space-x-4">
            <Link
              to={ `/update-post/${post._id}`}
              className="text-blue-500 hover:underline"
            >
              Update
            </Link>
            <button
              onClick={() => handleDeletePost(post._id , post.title)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      )) :
      <p>You have no posts</p>
      } 
    </div>  

   </>
    
  
  )
}

export default Profile ;
    

   

