import { createContext, useContext, useState } from "react";
import toast  from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie"; 
import { UserData } from "./userContext";

const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
    
    const { fetchUserData } = UserData();
    const navigate = useNavigate();
    const [posts , setPosts] = useState([])

    // Add Post
    async function addPost(title , content) {
        try {
            const token = Cookies.get('token')
            const { data } = await axios.post('http://localhost:4000/api/post/add' ,
             {title , content},
             { withCredentials: true } 
            );

            toast.success("Post Added");
            fetchUserData();
            navigate('/profile')


        } catch (error) {
            toast.error('Post Creation Failed')
        }

    }

    // To Fetch All Posts
    async function getAllPost() {
            try {
              const response = await axios.get('http://localhost:4000/api/post/all');
          
             
              const allPosts = response.data.posts;
          
              console.log(allPosts);

              setPosts(allPosts);
            } catch (error) {
              console.error("Error fetching posts:", error);
            }
    }

    // Delete a Post
    async function deletePost(id) {
        try {
            const response = await axios.delete(`http://localhost:4000/api/post/delete/`+ id ,
                { withCredentials: true } 
            )
            fetchUserData()
            getAllPost();
        } catch (error) {
            console.log(error.message)
        }

    }
    

    // Update a Post
    async function updatePost(id , title , content) {
        try {
            const response = await axios.put(`http://localhost:4000/api/post/update/` + id , 
                {title , content},
                { withCredentials: true } 
            )
         
            fetchUserData()
            getAllPost();
            toast.success("Post Updated")
            navigate('/profile')
        } catch (error) {
            console.log(`Error from the updateContext ${error.message}`)
            return toast.error(error.message)
        }
    }


   
 return (
      <PostContext.Provider value={ { addPost , getAllPost , posts , setPosts , deletePost , updatePost} }>
            {children}
     </PostContext.Provider>
 );
}

export const PostData = () => useContext(PostContext)