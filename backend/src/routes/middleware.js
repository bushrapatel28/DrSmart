const KJUR = require('jsrsasign');    //npm library for encryption

const path = require("path");

const ENV = process.env.NODE_ENV || "development";
const PATH = path.resolve(__dirname, "../.env." + ENV);

require("dotenv").config({ path: PATH });

// require('dotenv').config();

const middleware = {};

middleware.generateToken = (req, res, next) => {
  console.log("INSIDE MIDDLEWARE");
  console.log("CHECK", process.env.SDK_KEY);
  console.log("BODY", req.body);
  
   try {
    let signature = '';
    const iat = Math.round(new Date().getTime() / 1000) - 30;
    const exp = iat + 60 * 60 * 2;

    const oHeader = { alg: 'HS256', typ: 'JWT' };

    //Destructure req body to access user creds
    const {topic, passWord, userIdentity, sessionKey, roleType} = req.body;

    const sdkKey = process.env.SDK_KEY;             //Need to research
    // const sdkKey = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfa2V5IjoiVGVzdDIiLCJyb2xlX3R5cGUiOjEsInRwYyI6InRlc3QgdG9waWMiLCJ2ZXJzaW9uIjoxLCJpYXQiOjE3MjgzOTM1MjEsImV4cCI6MTcyODM5NzEyMX0.vcvRiXW1hT17EakAy_gd8K_FMuKVUcP-giWAp-zjwMg;
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

    console.log("PAYLOAD", oPayload);
    
    const sHeader = JSON.stringify(oHeader);
    const sPayload = JSON.stringify(oPayload);
    // signature = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, sdkSecret);
    signature = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfa2V5IjoidGVzdDEiLCJyb2xlX3R5cGUiOjEsInRwYyI6InRlc3QgdG9waWMiLCJ2ZXJzaW9uIjoxLCJpYXQiOjE3MjgzOTc5MjEsImV4cCI6MTcyODQwMTUyMX0.NLGsETXZ5Tlr6SabgCQHYoE2JFuRDkl7dqCWOSjlj1w";
    //Save signature to res.locals object
    res.locals.signature=signature;

    return next();
   }
   catch(err) {
    return next({err});
   }
}

module.exports = middleware;