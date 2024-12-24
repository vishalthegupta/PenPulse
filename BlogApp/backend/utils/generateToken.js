import jwt from 'jsonwebtoken'

const generateToken = async(id , res) => {
    const token =  jwt.sign({ id } , process.env.Secret_Key , {
          expiresIn : '15d',
     })

     res.cookie('token' , token , { 
        maxAge : 15 * 24 * 60 * 60 * 1000,
        httpOnly : true,
        sameSite : 'strict'
     })

     return token;
}

export default generateToken;