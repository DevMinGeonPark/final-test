const models = require("../../models");

exports.get_posts = async(_,res) => {
    try{
        res.json({status:"post main"});
    } catch(e){
        console.log(e);
    }
}