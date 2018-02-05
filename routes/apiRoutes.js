//////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////        API ROUTES                   //////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

// ** add routes for unlinking social media accounts
// google ---------------------------------
// app.get('/api/unlink/google', function(req, res) {
//   var user          = req.user;
//   user.google.token = undefined;
//   user.save(function(err) {
//     res.redirect('/profile');
//   });
// });

const passport = require("passport");

module.exports = app => {
  // GET CURRENT USER
  app.get("/api/current_user", (req, res) => {
    // returns the MongoDB user id that cookie-session extracted from cookie
    // console.log("user id: ", req.user.id);
    res.send(req.user);
  });

  // LOGOUT CURRENT USER
  // Passport also attaches a logout() method to the request object
  // method removes the req.user property and clears the login session
  app.get("/api/logout", (req, res) => {
    req.logout();
    // console.log("after LOGOUT req.user: ", req.user);
    // console.log("after LOGOUT session: ", req.session);
    res.redirect("/");
  });
};
