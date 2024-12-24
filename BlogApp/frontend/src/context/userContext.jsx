import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Cookies from "js-cookie"; 

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {

    const[isAuth, setIsAuth] = useState(false);
    const[user , setUser] = useState(null)
    const navigate = useNavigate();
    
    //To Get Profile Data
    const[email , setEmail] = useState('')
    const[username , setUsername] = useState('')
    const[posts , setPosts] = useState([])


     // Retrieve user data from localStorage on page load
     useEffect(() => {
      const token = Cookies.get('token');
      let storedUser = localStorage.getItem('user');  
      
      if (token && storedUser) {
          setIsAuth(true);
          setUser(JSON.parse(storedUser));  
          fetchUserData()
      }
  }, []);

    // Login
    async function login(email, password) {
        try {
            const { data } = await axios.post('http://localhost:4000/api/auth/login', { email, password })
            
                toast.success('Login Successful');
                Cookies.set('token', data.token);
                setIsAuth(true);
                setUser(data.userInfo);  
               
                // Store user data in localStorage
                localStorage.setItem('user', JSON.stringify(data.userInfo)); 

                navigate(`/profile`);


        } catch (error) {
            toast.error(`Login Failed`);
        }
    }
   // logout
   async function logout() {
        Cookies.remove('token');  
        setIsAuth(false);  
        setUser('')
        localStorage.removeItem('user');
        navigate('/');
    };
    
    // Register
    async function register(username , email , password , gender) {
      try {
        const { data } = await axios.post('http://localhost:4000/api/auth/sign-up', { email, password , username , gender});

        toast.success(data.message)
        Cookies.set('token', data.token);
        setIsAuth(true)
        setUser(data.userInfo);

        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(data.userInfo)); 

        navigate('/profile')

      } catch (error) {
        toast.error(`Sign-up Failed Failed`);
      }
   }

  


    const fetchUserData = async () => {

      const userId = user._id 

        try {
           const  response  = await axios.post('http://localhost:4000/api/auth/profile' , 
             {userId},
             { withCredentials: true } 
           )
          
          
           
           const userData = response.data;
   
           const username = userData.username
           const email = userData.email
           const posts = userData.posts
   
           setEmail(email)
           setUsername(username)
           setPosts(posts)
   
        } catch (error) {
           console.log(error.message);
        }
     }

    return (
        <UserContext.Provider value={{ login, isAuth, logout , register , user , setUser  , setUsername , username , setEmail , email , setPosts , posts , fetchUserData}}>
            {children}
        </UserContext.Provider>
    );
}

export const UserData = () => useContext(UserContext);
