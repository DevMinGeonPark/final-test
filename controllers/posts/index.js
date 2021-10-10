const express = require('express');
const router = express.Router();
const ctrl = require("./posts.ctrl");
const paginate = require('express-paginate');


router.get("/posts", paginate.middleware(5, 50) ,ctrl.get_posts);

// router.post("/posts/:id", ctrl.get_posts_id);

module.exports = router;