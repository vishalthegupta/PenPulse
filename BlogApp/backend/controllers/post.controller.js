import Post from '../models/post.model.js';
import User from '../models/user.model.js';


// To Add a Post
export const addPost = async(req , res) => {
       try {
          const { title , content } = req.body;
        
          const userId = req.user._id;
          
          const user = await User.findById(userId);

          if(!title || !content) {
            return res.status(400).json({message : "All Fields are required"})
          }
 
          const newPost =  await Post.create({
              title ,
              textContent : content,
              owner : user._id,
          })
         
          user.posts.push(newPost._id);

          await user.save();

          return res.status(201).json({message : "Post Created Successfully"})

       }
       catch (error) {
          console.log(error)
          return res.status(400).json({message : `Some Error Occured ${error.message}`})
       }
}


// To Delete a Post
export const deletePost = async (req, res) => {
   try {
      const postId  = req.params.id;
      const userId = req.user._id;
  
      if (!postId) {
        return res.status(400).json({ message: "No post with this id" });
      }

      
      const post = await Post.findById(postId);
     

      // Check if the current user is the owner of the post
      if (post.owner.toString() !== userId.toString()) {
        return res.status(403).json({ message: "You do not have permission to delete this post" });
      }

     
      await Post.findByIdAndDelete(postId);

      // Remove the post from the user's posts array
      await User.findByIdAndUpdate(userId, {
        $pull: { posts: postId }
      });

      return res.status(200).json({ message: "Post Deleted Successfully" });

   } catch (error) {
       console.error(error);
       return res.status(500).json({ message: `An error occurred: ${error.message}` });
   }
}

// To Update a Post
export const updatePost = async(req , res) => {
   try {
      const { title , content} = req.body;
      const postId  = req.params.id;
      const userId = req.user._id;
  
      if(!postId) {
        return res.status(400).json({message : "No post with this id"})
      }
      
      const post = await Post.findById(postId);

      // Checking whether post belongs to the current user
      if (post.owner.toString() !== userId.toString()) {
            return res.status(403).json({ message: "You do not have permission to update this post" });
       }

      await Post.findByIdAndUpdate(postId , {
         title ,
         textContent : content,
         owner : userId,
      })

      
      return res.status(200).json({message : `Post Updated Succesfully`})
      
   } catch (error) {
      return res.status(400).json({message : `Some Error Occured ${error.message}`})
   }
}


// To Get All Post
export const getAllPost = async(req , res) => {
     try {
         const  posts  = await Post.find()
         
         return res.status(200).json({
            message : `Posts retrieved successfully`,
            posts,
         })

     } catch (error) {
      return res.status(400).json({message : `Some Error Occured ${error.message}`})
     }
}

// To Get One Post
export const getPost = async(req , res) => {
   try {
       const postId = req.body;

       const post = await Post.findById(postId);

       return res.status(200).json({
         message : `Post Fetched Successfully`,
         post
       })

   } catch (error) {
      return res.status(400).json({message : `Some Error Occured ${error.message}`})
   }
}


// To Get One Post by params
export const getOnePost = async(req , res) => {
   try {
       const { id }= req.params;

       const post = await Post.findById(id).populate('owner' , 'username');

       return res.status(200).json({
         message : `Post Fetched Successfully`,
         post
       })

   } catch (error) {
      return res.status(400).json({message : `Some Error Occured ${error.message}`})
   }
}
