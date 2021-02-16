//const postRoutes = require("./posts");
const bandRoutes = require("./bands");

const constructorMethod = app => {
  //app.use("/posts", postRoutes);
  app.use("/bands", bandRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;