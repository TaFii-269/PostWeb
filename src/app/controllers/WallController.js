import Post from "../models/Post.js";
import User from "../models/User.js";
import connection from "../../config/db/index.js";
import { ObjectId } from 'mongodb';

class WallController {

    //show post of writing author
    async wall(req, res) {
        connection.connect().then(async (db) => {
        try{
            const emailUser = await User.findByEmail(db, req.email);
            if (emailUser) { // Kiểm tra nếu người dùng tồn tại
                // console.log(emailUser);
                const createAuthor = emailUser._id.toString();
                const resultByAuthor = await Post.findByAuthor(db, createAuthor);
                // console.log(resultByAuthor);
                res.render('myPosts', { myPosts: resultByAuthor });
            } else {
                // Xử lý khi không tìm thấy người dùng
            }
        }catch (err){
            console.error(err);
        } finally{
            await connection.close();
        }
    })
    }

    formupdate(req, res) {
        connection.connect().then(async (db) => {
          
            try {
                const id = req.params.id;
                // console.log(id);
                const result = await Post.findById(db, new ObjectId(id));
                console.log(result);
                res.render('updateMyPosts', { mypost: result, postId: id});
                if (!result) {
                    return res.status(404).json({ message: "Không tìm thấy post" });
                }
                // res.json(result);
            } catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
            } finally {
                await connection.close();
            }
        })
    }

    updateUser(req, res) {
      const id = req.params.id;   
      try {              
        connection.connect().then(async (db) => {
            const post = new Post(undefined, req.body.title, req.body.image, req.body.content, req.body.date);
            const result = await post.update(db,new ObjectId(id));
            // console.log(result);
            res.redirect('/posts/wall');
            if (!result) {
                return res.status(404).json({ message: "Không tìm thấy bài viết" });
            }
        })                  
              // res.json(result);             
      } catch (err) {
          console.error(err);
          res.status(500).send('An error occurred');
      }
    }
    
    delete(req, res) {
        connection.connect().then(async (db) => {
          try {
            const id = req.params.id;
            const post = new Post();
            const result = await post.del(db, new ObjectId(id));
            console.log(result);
            res.redirect('/posts/wall');
            
          } 
          catch (err) {
            console.error(err);
            res.status(500).send("An error occurred");
          } finally {
            await connection.close();
          }
        });
      }
    
}
    

export default new WallController();