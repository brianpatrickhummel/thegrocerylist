// Factory will replicate actions of cookie-session middleware
// Use generate valid session object data from Passport object

// safe-buffer library - convert string data formats for Node
const buffer = require("safe-buffer").Buffer;
const Keygrip = require("keygrip");
const keys = require("../../config/keys.js");
// Initialize Keygrip with our Cookie Signing Key
const keygrip = new Keygrip([keys.cookieKey]);

module.exports = user => {
  // Generate a fake session JSON object, which passport would have normally given to cookie-session
  const sessionObject = {
    passport: {
      user: user._id.toString()
    }
  };
  // Convert our session object to the base64 string  (mimic passing of User data from Passport to cookie-session)
  const session = Buffer.from(JSON.stringify(sessionObject)).toString("base64");
  // Generate Signature using session string
  const sig = keygrip.sign("session=" + session);

  return { session, sig };
};
