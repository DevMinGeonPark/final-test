const models = require("../../models");

exports.get_posts = async(req, res) => {

    try {
  
      const [posts] = await Promise.all([
  
        models.Posts.findAll({
          limit: req.query.limit,
          offset: req.offset,
          order: [['createdAt', 'desc']]
        }),
  
        models.Posts.count()
      ]);
  
  
      res.json({
        posts
      });
  
    } catch (e) {
      console.log(e);
    }
}

exports.get_posts_id = async(req,res) => {
    try {
        const posts = await models.Posts.findOne({
          where: {
            id: req.params.id
          },
          include: ["Posts"]
        });

        res.json({posts});
    
      } catch (e) {
        console.log(e);
      }
}