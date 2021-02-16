const issuesRoutes = require("./issues");
const usersRoutes = require("./users");
const express = require('express');
const outRoutes = require('./loginRoutes')

const constructorMethod = app => {
  app.use("/issues", issuesRoutes)
  // app.use("/users", usersRoutes)
  app.use("/", outRoutes)
  app.use("*", (req, res) => {
    res.render('grievances/error', { title: "Error", message: "Route does not exist"});//sample comment
  });
};
module.exports = constructorMethod
