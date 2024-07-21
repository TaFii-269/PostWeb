import Post from "../models/Post.js";
import User from "../models/User.js";
import connection from "../../config/db/index.js";
import { ObjectId } from 'mongodb';


class SiteController {
    index(req, res) {
        connection.connect().then(async (db) => {
            try {
                const result = await Post.findAll(db);
                // console.log(result);
                res.render('home', { posts: result });
             } catch (err) {
                console.error(err);
            }   finally {
                await connection.close();
            }
        });
    }

    about(req, res) {
        res.render('about');
    }

    detail(req, res) {
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

    create(req, res) {
        res.render('posts/create', {email: req.email});   
    }

    store(req, res) {
        console.log(req.body);
        connection.connect().then(async (db) => {
            try {
                const emailUser = await User.findByEmail(db, req.email);
            const createAuthor = emailUser._id.toString();
                const post = new Post(undefined, req.body.title, req.body.image, req.body.content, req.body.date, createAuthor);
                const result = await post.save(db);
                console.log(result);
                res.redirect('/');
                // res.json(result);
            } catch (err) {
                console.error(err);
                res.status(500).send('An error occurred');
            } finally {
                await connection.close();
            }
        });
    }

    
}

export default new SiteController();
