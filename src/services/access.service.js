'use strict'
const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
};

class AccessService {
    static signUp = async ({name, email, password}) => {
        try {
            //Check email exist
            const hodelShop = await shopModel.findOne({ email }).lean();
            if (hodelShop) {
                return {
                    code: 'xxx',
                    message: 'Shop already registered',
                    status: 'error'
                }
            }

            //Create shop
            const newShop = await shopModel.create({
                name,
                email,
                password,
                roles: [RoleShop.SHOP]
            });
            
            if (newShop) {
                //create token private key dung de sign token, public key dung de vedify token
                const { privateKey, publicKey} = crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096,
                    publicKeyEncoding: {
                        type: 'spki',
                        format: 'pem'
                    },
                    privateKeyEncoding: {
                        type: 'pkcs8',
                        format: 'pem',
                    },
                });
                console.log(publicKey, privateKey);								//save collenction key
            }

            //Create password hash
            const passwordHash = await bcrypt.hash(password, 10);               //hash voi do kho 10
        } catch (error) {
            return {
                code: 'xxx',
                message: error.message,
                status: 'error'
            }
        }
     } 
}

module.exports = new AccessService();