import express from 'express';
import controller from '../controllers/Post';

const router = express.Router();

router.post('/create', controller.createPost);
router.get('/get/:postId', controller.readPost);
router.get('/get', controller.readAll);
router.patch('/update/:postId', controller.updatePost);
router.delete('/delete/:postId', controller.deletePost);

export = router;