import express from "express"; // step 1
import postController from "../app/controllers/PostController.js";  // step 3

const router = express.Router(); // step 2

// router.use('/detail', postController.detail);
// router.use('/:id', postController.index); 
// router.use('/', postController.index);


export default router;