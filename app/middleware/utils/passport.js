const passport = require('passport')
const Auctioneer = require('../../models/Auctioneer')
const Bidder = require('../../models/Bidder')
const auth = require('../../controllers/authentication/helpers')
const JwtStrategy = require('passport-jwt').Strategy

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
  if (token) {
    // Decrypts token
    token = auth.decrypt(token)
  }
  return token
}

/**
 * Options object for jwt middlware
 */
const jwtOptions = {
  jwtFromRequest: jwtExtractor,
  secretOrKey: appInfo.JWT_SECRET
}

/**
 * Login with JWT middleware
 */
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {//console.log(payload)
  if(payload.data.reqType == 1){
  Auctioneer.findById(payload.data._id, (err, user) => {
    if (err) {
      return done(err, false)
    }
    return !user ? done(null, false) : done(null, user)
  })
}else if(payload.data.reqType == 2){
  Bidder.findById(payload.data._id, (err, user) => {
    if (err) {
      return done(err, false)
    }
    return !user ? done(null, false) : done(null, user)
  })
}
})
passport.use(jwtLogin)