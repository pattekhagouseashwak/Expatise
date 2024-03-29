const jwt = require('jsonwebtoken')
const { encrypt } = require('../helpers/encrypt ')
const appInfo = require('../../../../settings.json')

/**
 * Generates a token
 * @param {Object} user - user object
 */
const generateToken = (user = '',reqType ="") => { console.log("user",user,reqType);
  try {
    // Gets expiration time
    const expiration =
      Math.floor(Date.now() / 1000) + 60 * appInfo.JWT_EXPIRATION_IN_MINUTES

    // returns signed and encrypted token
    return encrypt(
      jwt.sign(
        {
          data: {
            _id: user,
            reqType
          },
          exp: expiration
        },
        appInfo.JWT_SECRET
      )
    )
  } catch (error) {
    throw error
  }
}

module.exports = { generateToken }