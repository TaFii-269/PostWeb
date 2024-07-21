import express from "express";
import siteController from "../app/controllers/SiteController.js";
import wallController from "../app/controllers/WallController.js";

const router = express.Router();
router.post('/store', siteController.store);
router.post('/store', siteController.store);
router.get('/detail/:id', siteController.detail);
router.get('/create', siteController.create);
router.get('/wall', wallController.wall);
router.get('/delete/:id', wallController.delete);
router.route('/update/:id').get(wallController.formupdate).post(wallController.updateUser);
router.get('/posts', siteController.index);
router.get('/', siteController.index);



export default router;
