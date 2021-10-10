const models = require("../../models");


//[GET] posts ctrl
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
        });
        
        //If you don't have an ID
        if (posts === null) {
          res.json({message:"this id is null"})
        } else {
          res.json({posts});
        }
        
      } catch (e) {
        console.log(e);
      }
}

exports.get_search = async (req, res) => {
  try {
    const posts = await models.Posts.findAll({
      include : [ 'Tag' ],

      where : {
          ...( 
          // 검색어가 있는 경우
          ('name' in req.query && req.query.name) ? 
          {
              // + 태그에서 가져옴 or
              [models.Sequelize.Op.or] : [
                  models.Sequelize.where( models.Sequelize.col('Tag.name') , {
                      [models.Sequelize.Op.like] : `%${req.query.name}%`
                  }),
                  {
                      'title' : {
                          [models.Sequelize.Op.like] : `%${req.query.name}%`
                      }
                  }
              ],
          }
          :
          '')
      }
    });

    res.json({ posts })
  } catch (e) {
    console.log(e);
  }
};

//[POST] posts ctrl
exports.post_posts_write = async(req,res) => {
  try {
    await models.Posts.create(req.body);
    console.log(req.body);
    res.json({
        message: 'success'
    })
  } catch (e) {
    console.log(e);
    res.json({
        message: 'fail'
    })
}
}

//[PUT] posts ctrl
exports.put_posts_edit = async(req,res) => {
  try {
    await models.Posts.update(req.body, {
      where: { id: req.params.id }
    });
      res.json({
          message: 'success'
      })
    } catch (e) {
      console.log(e);
      res.json({
          message: 'fail'
      })
  }
}

//[POST] tag ctrl
exports.post_posts_tag = async (req, res) => {
  try{
      const posts = await models.Posts.findByPk(req.body.post_id);
      const tag = await models.Tag.findOrCreate({
          where: {
              name: req.body.name
          }
      });
      const status = await posts.addTag(tag[0]);

      if (JSON.stringify(status) == undefined) {
        res.json({
          status: "[]"
        })
      }
      else {
        res.json({
          status: status
        });
      }

  } catch (e) {
      console.log(e);
      res.json({
          message: 'fail'
      });
  }
};

//[DEL] posts ctrl
exports.delete_posts = async (req, res) => {
  try {
    await models.Posts.destroy({
      where: {
        id: req.params.id
      }
    })
    res.json({
      message: 'success'
    });
  } catch (e) {
    console.log(e);
    res.json({
      message: "fail"
    });
  }
};

//[DEL] delete ctrl
exports.delete_posts_tag = async (req, res) => {
  try {
    const posts = await models.Posts.findByPk(req.params.post_id);
    const tag = await models.Tag.findByPk(req.params.tag_id);

    const result = await posts.removeTag(tag);

    res.json({
      result: result
    });
  } catch (e) {
    console.log(e);
    res.json({
      message: "fail"
    });
  }
};