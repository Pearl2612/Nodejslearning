"use strict";

const { filter } = require("lodash");
const keytokenModel = require("../models/keytoken.model");

class KeyTokenService {
    static createKeyToken = async ({
        userId,
        publicKey,
        privateKey,
        refreshToken,
    }) => {
        try {
            //level 0
            // const publicKeyString = publicKey.toString();
            // const tokens = await keytokenModel.create({
            // user: userId,
            // publicKey: publicKeyString,
            // });

            //return tokens ? tokens.publicKey : null;

            // level 1
            const filter = { user: userId },
                update = {
                    publicKey,
                    privateKey,
                    refreshTokenUsed: [],
                    refreshToken,
                },
                options = {
                    upsert: true,
                    new: true,
                };
            const tokens = await keytokenModel.findOneAndUpdate(
                filter,
                update,
                options
            );

            return tokens ? tokens.publicKey : null;
        } catch (error) {
            return error;
        }
    };
}

module.exports = KeyTokenService;
