"use strict"
const JWT = require("jsonwebtoken");
const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        const accessToken = await JWT.sign(payload, privateKey, {expiresIn: "2 days", algorithm: "RS256"});
        const refreshToken = await JWT.sign(payload, privateKey, {expiresIn: "7 days", algorithm: "RS256"});
        JWT.verify(accessToken, publicKey, (err, decoded) => {
            if(err){
                console.log("error verify: ", err);
            }
            else {
                console.log("decoded verify: ", decoded);
            }
        })
        return {
            accessToken,
            refreshToken,
        }
    } catch (error) {
        return error;
    }
}
module.exports = {createTokenPair};