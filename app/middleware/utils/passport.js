const passport = require('passport')
const profile = require('../../models/profile')
const adminlogins = require('../../models/adminlogins')
const auth = require('../../controllers/authentication/helpers')
const appInfo = require('./../../../settings.json')
const JwtStrategy = require('passport-jwt').Strategy
let accesToken;
/**
 * Extracts token from: header, body or query
 * @param {Object} req - request object
 * @returns {string} token - decrypted token
 */
const jwtExtractor = (req) => {
  let token = null
  if (req.headers.authorization) {
    token = req.headers.authorization.replace('Bearer ', '').trim()
  } else if (req.cookies.access_token) {
    token = req.cookies.access_token.trim()
  } else if (req.body.token) {
    token = req.body.token.trim()
  } else if (req.query.token) {
    token = req.query.token.trim()
  }
  accesToken = token;
  if (token) {
    // Decrypts token
    token = auth.decrypt(token)
  }
  return token
}

/*** Options object for jwt middlware ***/
const jwtOptions = {
  jwtFromRequest: jwtExtractor,
  secretOrKey: appInfo.JWT_SECRET
}

/*** Login with JWT middleware ***/

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  if (payload.data.reqType == appInfo.ADMINROLE) {
    adminlogins.find({_id:payload.data._id,token:accesToken}, (err, user) => {
      if (err) {
        return done(err, false)
      }
      return (user && user.length !=0 )? done(null, user) : done(null, false)
    })
  } else if (payload.data.reqType == appInfo.USEROLE) {
    console.log(payload.data.reqType)
    profile.findById(payload.data._id, (err, user) => {
      if (err) {
        return done(err, false)
      }
      //console.log(user)
      return !user ? done(null, false) : done(null, user)
    })
  }
})
passport.use(jwtLogin)