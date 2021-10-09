const express = require('express');
const router = express.Router();
const ctrl = require("./posts.ctrl");

router.get('/posts', ctrl.get_posts)

module.exports = router;