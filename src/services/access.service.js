"use strict"
const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getIntoData } = require("../utils");
const RoleShop = {
    SHOP: "SHOP",
    WRITER: "WRITER",
    EDITOR: "EDITOR",
    ADMIN: "ADMIN"
};

class AccessService {
    static signUp = async ({name, email, password}) => {
        try {
            //Check email exist
            const hodelShop = await shopModel.findOne({ email }).lean();
            if (hodelShop) {
                return {
                    code: "xxx",
                    message: "Shop already registered",
                }
            }

            const passwordHash = await bcrypt.hash(password, 10);               //hash voi do kho 10
            //Create shop
            const newShop = await shopModel.create({
                name,
                email,
                password: passwordHash,
                roles: [RoleShop.SHOP]
            });
            
            if (newShop) {
                //create token private key dung de sign token, public key dung de vedify token
                const { privateKey, publicKey} = crypto.generateKeyPairSync("rsa", {
                    modulusLength: 4096,
                    publicKeyEncoding: {   
                        type: "pkcs1",                                          //public key cryptogenerateKeyPairSync tra ve dang string            
                        format: "pem",
                    },
                    privateKeyEncoding: {   
                        type: "pkcs1",                                          //public key cryptogenerateKeyPairSync tra ve dang string            
                        format: "pem",
                    },
                });
                console.log(publicKey, privateKey);								//save collenction key
                const publicKeyString = await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey,
                });
                if(!publicKeyString){
                    return {
                        code: "xxx",
                        message: "Can not create key token",
                    }
                }
                const publicKeyObject = crypto.createPublicKey(publicKeyString); //tao public key object
                //Create token pair
                const tokens = await createTokenPair({ userId: newShop._id, email }, publicKeyString, privateKey);
                console.log(`Created Token Success:: `, tokens);

                return {
                    code: 201,
                    metadata: {
                        shop: getIntoData({ fileds: ["_id", "name", "email"], object: newShop }),
                        tokens,
                    }
                }
            }
            return {
                code: 200,
                metadata: null,
            }

            //Create password hash
        } catch (error) {
            return {
                code: "xxx",
                message: error.message,
            }
        }
     } 
}

module.exports = AccessService;