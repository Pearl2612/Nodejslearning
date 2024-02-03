"use strict"

const accessService = require("../services/access.service");

class AccessController {
    signUp = async (req, res, next) => {
        return res.status(201).json(await accessService.signUp(req.body));
    }
}

// 200 - OK
// 201 - Created

module.exports = new AccessController();