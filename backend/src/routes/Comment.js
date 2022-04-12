const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/Comment');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/:id/add',auth, multer, commentCtrl.addComment);
router.get('/:id',auth, commentCtrl.getAllComment);
router.delete('/:id', auth, commentCtrl.deleteComment);
router.post('/:id/update', auth, commentCtrl.updateComment);
router.get('/user/post', auth, commentCtrl.getAllUserComment)


module.exports = router;