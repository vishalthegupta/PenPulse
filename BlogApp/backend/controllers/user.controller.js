import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import generateToken from '../utils/generateToken.js';


// Sign-up
export const signUp = async (req, res) => {
    try {
        const { email, password, username, gender } = req.body;

        // Validating Fields
        if (!email || !password || !username || !gender) {
            return res.status(400).json({
                message: "All values are required",
            });
        }

        const user = await User.findOne({ email });

        // Check if user already exists
        if (user) {
            return res.status(409).json({
                message: "Already have a user with this email",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            gender,
        });

        // Generate token and send it via cookie
        const token = generateToken(newUser._id, res);

        res.status(201).json({
            message: "Sign-up Successful",
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Sign-up Failed" });
    }
};

// Log-in
export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        

        // Validating fields
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        
        const userInfo = await User.findOne({ email }).select('-password');

        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isMatched = await bcrypt.compare(password, user.password);

        if (!isMatched) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Generate token and send it via cookie
        const token = await generateToken(user._id, res);
        
       return res.status(200).json({
            message: "Login Successful",
            userInfo,
            token,
        });

    } catch (error) {
        console.log(`Error occured : ${error.message}`);
        return res.status(400).json( `Error message is : ${error.message}` );
    }
};

// Log-out
export const logOut = async (req, res) => {
    try {
        // Clearing the cookie by setting its maxAge to 0
        res.cookie('token', '', { maxAge: 0 });

        res.status(200).json({
            message: "Log Out Successful"
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Logout Failed" });
    }
};


// Get User Profile
export const getUserProfile = async (req, res) => {
    try {
        const  { userId } =  req.body;

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required"
            });
        }
        const user = await User.findById(userId).select("-password").populate("posts");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        return res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
  