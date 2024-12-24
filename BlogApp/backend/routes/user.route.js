import express from 'express'
import { signIn , signUp , logOut, getUserProfile } from '../controllers/user.controller.js';
import  isAuth  from '../middleware/userAuth.js';


const router = express.Router();

router.post('/login' , signIn)

router.post('/sign-up' , signUp)

router.post('/log-out' , isAuth ,logOut)

router.post('/profile' , getUserProfile)

export default router;


