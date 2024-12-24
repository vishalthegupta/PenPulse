import express from 'express'
import { addPost, deletePost, getAllPost, getPost, updatePost , getOnePost } from '../controllers/post.controller.js'
import isAuth from '../middleware/userAuth.js'

const router = express.Router();


// To Add a Post
router.post('/add' , isAuth , addPost)


// To Delete a Post
router.delete('/delete/:id' , isAuth , deletePost)


// To Update a Post
router.put('/update/:id' , isAuth , updatePost)


// To Get All Post
router.get('/all' ,  getAllPost)


// To Get One Post
router.get('/read' , getPost)


router.get('/:id', getOnePost)

export default router;