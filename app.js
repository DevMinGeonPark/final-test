//express
const express = require('express')
// dev log print
const logger = require('morgan');
const nunjucks = require("nunjucks");


const db = require("./models");

class App {
  constructor() {
    this.app = express();

    // db connect
    this.dbConnection();

    // middleWare
    this.setMiddleWare();

    // Routing
    this.getRouting();

    // 404 status
    this.status404();

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

  setMiddleWare() {
    // middleWare
    this.app.use(logger("dev"));
    //bodypaser -> express
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  getRouting() {
    this.app.use(require("./controllers"));
  }


  status404() {
    this.app.use((req, res, _) => {
      res.status(404).json({ statusCode: "404" })
    });
  }

}


module.exports = new App().app;