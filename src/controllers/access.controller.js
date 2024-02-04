"use strict";

const accessService = require("../services/access.service");
const { OK, CREATED } = require("../core/success.response");
const AccessService = require("../services/access.service");
class AccessController {
    signUp = async (req, res, next) => {
        // return res.status(200).json({
        //     message: '',
        //     metadata:
        // })
        new CREATED({
            message: "Regiserted OK!",
            metadata: await AccessService.signUp(req.body),
            options: {
                limit: 10,
            },
        }).send(res);
    };
}

// 200 - OK
// 201 - Created

module.exports = new AccessController();
