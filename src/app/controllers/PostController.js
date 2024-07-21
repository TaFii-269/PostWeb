import Post from "../models/Post.js";
import connection from "../../config/db/index.js";
import { ObjectId } from 'mongodb';
class PostController {

    index(req, res) {
        connection.connect().then(async (db) => {
            try {
                const id = req.params.id;
                const result = await Post.findById(db, new ObjectId(id));
                console.log(result);
                res.render('postdetail', { postdetail: result, postId: id });
                if (!result) {
                    return res.status(404).json({ message: "Không tìm thấy post" });
                }
             } catch (err) {
                console.error(err);
            }   finally {
                await connection.close();
            }
        });
    }

    
    
    show(req, res) {
        console.log(req.params.id);
        
    }
}
    

export default new PostController();