const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/Post');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post("/", auth, multer, postCtrl.addPost);
router.get('/', auth, postCtrl.getAllPost);
router.get('/:id', auth, multer, postCtrl.getOnePost);
router.post('/:id', auth, multer, postCtrl.updateOne);
router.delete('/:id', auth, postCtrl.deleteOnePost);
router.get('/user/post', auth, postCtrl.getAllUserPost)
router.get('/search/:id', auth, postCtrl.getAllUserSearchPost)

module.exports = router;