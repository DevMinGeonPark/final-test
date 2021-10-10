//express
const express = require('express');
const router = express.Router();
const paginate = require('express-paginate');
//controller
const ctrl = require("./posts.ctrl");

//get
router.get("/", paginate.middleware(5, 50) ,ctrl.get_posts);
router.get("/search", ctrl.get_search);
router.get("/:id" ,ctrl.get_posts_id);

//post
router.post("/", ctrl.post_posts_write);
router.post("/tag", ctrl.post_posts_tag);

//put
router.put("/:id", ctrl.put_posts_edit);

//del
router.delete('/:id', ctrl.delete_posts)
router.delete('/tag/:post_id/:tag_id', ctrl.delete_posts_tag);


module.exports = router;