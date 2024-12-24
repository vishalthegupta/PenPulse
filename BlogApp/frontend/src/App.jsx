import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import AddPost from './pages/AddPost';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import UpdatePost from './pages/UpdatePost';
import PostRead from './pages/PostRead';
import NotFound from './components/NotFound'
import { UserContextProvider } from './context/userContext';
import { PostContextProvider } from './context/postContext';
import { Toaster } from 'react-hot-toast';


const App = () => {

  return (
    <>
      <BrowserRouter>
        <UserContextProvider>
          <PostContextProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add-post" element={<AddPost />} />
              <Route path={`/update-post/:id`} element={<UpdatePost />} />
              <Route path={`/read/:id`} element={<PostRead />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path={`/profile`}  element={<Profile/>} />
              <Route path={`*`}  element={<NotFound/>} />
            </Routes>
            <Footer />
          </PostContextProvider>
        </UserContextProvider>
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;
