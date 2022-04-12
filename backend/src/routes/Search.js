const express = require('express');
const router = express.Router();
const searchCtrl = require('../controllers/Search');
const auth = require('../middleware/auth');

router.post('/', auth, searchCtrl.searchSomething)
module.exports = router;