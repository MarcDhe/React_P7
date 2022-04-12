const express = require('express');
const router = express.Router();

const messageCtrl = require('../controllers/Message');
const auth = require('../middleware/auth');

router.post('/new', auth, messageCtrl.newMessage),
router.get('/', auth, messageCtrl.getAllMyMessage),
router.post('/:id', auth, messageCtrl.getConversation),
router.get('/:id/read', auth, messageCtrl.markReaded),
router.get('/last/messages', auth, messageCtrl.lastMessages)

module.exports = router;
