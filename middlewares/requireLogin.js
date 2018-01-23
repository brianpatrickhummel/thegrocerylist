// Survey,Emailer Creation & Stripe Billing Middleware - Check for logged in user

module.exports = (req, res, next) => {
  // if Passport has not assigned a User Model to req, send a Forbidden Status
  if (!req.user) {
    return res.status(401).send({ error: "You must be logged in!" });
  }

  next();
};
