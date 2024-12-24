import React, { useEffect, useState } from 'react'
import PostHeader from '../components/PostHeader'
import { PostData } from '../context/postContext'

const Home = () => {
   
  const { posts  , getAllPost} = PostData();
  
  function fetchPosts() {
    getAllPost()
  }

  useEffect(() => {
    fetchPosts()
  } , [])
  return (
    <div className='min-h-screen min-w-[70%]'>
       {posts.length && posts.length > 0 ?
        posts.map((post , index) => (
            <PostHeader key={index} post={post}/>
        ))
       : 
       <p className='flex font-bold text-3xl mt-20 items-center justify-center'>No Data</p>
       }
    </div>
    
  )
}

export default Home;
