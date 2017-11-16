module.exports = app => {
  // Get current user
  app.get("/", (req, res) => {
    res.send({ name: "Brian Hummel" });
  });
};
