"use strict";
const JWT = require("jsonwebtoken");
const asyncHandler = require("../helpers/asyncHandler");
const { AuthFailureError, NotFoundError } = require("../core/error.response");
const { findByUserId } = require("../services/keyToken.service");

const HEADER = {
    API_KEY: "x-api-key",
    CLIENT_ID: "x-client-id",
    AUTHORIZATION: "authorization",
};

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        const accessToken = await JWT.sign(payload, privateKey, {
            expiresIn: "2 days",
            algorithm: "RS256",
        });
        const refreshToken = await JWT.sign(payload, privateKey, {
            expiresIn: "7 days",
            algorithm: "RS256",
        });
        JWT.verify(accessToken, publicKey, (err, decoded) => {
            if (err) {
                console.log("error verify: ", err);
            } else {
                console.log("decoded verify: ", decoded);
            }
        });
        return {
            accessToken,
            refreshToken,
        };
    } catch (error) {
        return error;
    }
};

const authentication = asyncHandler(async (req, res, next) => {
    /*
        1 - Check userId missing
        2 - Get accessToken
        3 - VerifyToken
        4 - Get user in db
        5 - Check keyStore with this userId
        6 - OkAll => return next
    */

    const userId = req.headers[HEADER.CLIENT_ID];
    if (!userId) throw new AuthFailureError("Invalid Request");

    //2
    const keyStore = await findByUserId(userId);
    if (!keyStore) throw new NotFoundError("Not found keyStore");
    
    //3
    const accessToken = req.headers[HEADER.AUTHORIZATION];
    if (!accessToken) throw new AuthFailureError("Invalid Request");

    try {
        const decodedUser = JWT.verify(accessToken, keyStore.publicKey);
        if (userId !== decodedUser.userId) throw new AuthFailureError("Invalid UserID");
        req.keyStore = keyStore;
        return next();
    } catch (error) {
        throw error;
    }


});
module.exports = { createTokenPair, authentication };
