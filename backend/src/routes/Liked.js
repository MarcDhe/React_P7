const express = require('express');
const router = express.Router();

const likeCtrl = require('../controllers/Liked');
const auth = require('../middleware/auth');

router.post('/:id', auth, likeCtrl.manageLike)
router.get('/', auth, likeCtrl.getAllLikedPost)

module.exports = router;
