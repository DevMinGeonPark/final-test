const { Router } = require("express");
const router = Router();


function rootMiddleware(req,res,next) {
    console.log("[Middleware] root in action")
    next();
}

router.get("/", rootMiddleware, (req, res) => {
    res.json({status:"mian-pages"})
});

router.use("/posts",require("./posts"))

module.exports = router;
