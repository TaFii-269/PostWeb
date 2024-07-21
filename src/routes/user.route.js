import express from "express"; // step 1
import userController from "../app/controllers/UserController.js";  // step 3
 
const router = express.Router(); // step 2

router.use('/create', userController.create); 
router.use('/:id', userController.show); 
router.use('/', userController.index); 

export default router;