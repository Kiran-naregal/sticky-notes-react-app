const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/user')

// ROUTE 1: Create a User using: POST "/api/auth/"
router.post('/', [
    body('name', 'Enter name of min size three').isLength({min: 3}),
    body('password', 'Enter password atleast 5 characters').isLength({min: 5}),
    body('email', 'Enter a valid email').isEmail()
],async (req, res)=>{
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).json({error: result.array()});
    }
    await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }).then(user => res.json(user))
    .catch(error => res.json(error))
})

module.exports = router