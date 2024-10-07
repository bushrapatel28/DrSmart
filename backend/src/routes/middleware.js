const KJUR = require('jsrsasign');    //npm library for encryption
require('dotenv').config();

const middleware = {};

middleware.generateToken = (req, res, next) => {
   try {
    let signature = '';
    const iat = Math.round(new Date().getTime() / 1000);
    const exp = iat + 60 * 60 * 2;

    const oHeader = { alg: 'HS256', typ: 'JWT' };

    //Destructure req body to access user creds
    const {topic, passWord, userIdentity, sessionKey, roleType} = req.body;
    const sdkKey = process.env.SDK_KEY;             //Need to research
    const sdkSecret = process.env.SDK_SECRET;

    const oPayload = {
      app_key: sdkKey,
      iat,
      exp,
      tpc: topic,
      pwd: passWord,
      user_identity: userIdentity,
      session_key: sessionKey,
      role_type: roleType,
    };

    const sHeader = JSON.stringify(oHeader);
    const sPayload = JSON.stringify(oPayload);
    signature = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, sdkSecret);
    //Save signature to res.locals object
    res.locals.signature=signature;

    return next();
   }
   catch(err) {
    return next({err});
   }
}

module.exports = middleware;