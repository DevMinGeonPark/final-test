//express
const express = require('express')
// dev log print
const logger = require('morgan');
const nunjucks = require("nunjucks");

// const posts = require('./controllers/posts/posts');

const db = require("./models");

class App {
    constructor() {
        this.app = express();

        // db 접속
        this.dbConnection();

        // 라우팅
        this.getRouting();

        // 404 페이지를 찾을수가 없음
        this.status404();

        // 미들웨어 셋팅
        this.setMiddleWare();

    }

    // app.use(logger('dev'));

    setMiddleWare() {
        // 미들웨어 셋팅
        this.app.use(logger("dev"));
    }

    getRouting() {
        this.app.use(require("./controllers"));
    }


    status404() {
        this.app.use((req, res, _) => {
            // res.status(404).render("common/404.html");
            res.status(404).json({status:"404"})
        });
    }

    dbConnection() {
    // DB authentication
    db.sequelize
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
        return db.sequelize.sync(); 
      })
      .then(() => {
        console.log("DB Sync complete.");
      })
      .catch((err) => {
        console.error("Unable to connect to the database:", err);
      });
    }

}






module.exports = new App().app;