"use strict"

const accessService = require("../services/access.service");

class AccessController {
    signUp = async (req, res, next) => {
        try {
            console.log(`[P]::signUp::`, req.body);
            return res.status(201).json(await accessService.signUp(req.body));
        } catch (error) {
            next(error);
        }
    }
}

// 200 - OK
// 201 - Created

module.exports = new AccessController();