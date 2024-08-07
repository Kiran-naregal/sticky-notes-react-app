const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

// ROUTE 1: Create a new User using: POST "/api/auth/createUser". No login required
router.post('/createUser', [
    body('name', 'Enter name of min size three').isLength({min: 3}),
    body('password', 'Enter password atleast 5 characters').isLength({min: 5}),
    body('email', 'Enter a valid email').isEmail()
],async (req, res)=>{
    let success = false
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).json({success, error: result.array()});
    }
    try {
        let user = await User.findOne({email: req.body.email})
        if(user){
            res.status(400).json({success, message:'User with specified email id exist'});
        }
        const salt = await bcrypt.genSalt(10);
        const securePass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePass
        });
        const Data = {
            user:{
                id: user.id
            }
        }
        const Token = jwt.sign(Data, process.env.JWT_SECRET);
        success = true
        res.status(200).json({success, Token, name: req.body.name});
    } catch (error) {
        console.log('Unexpected error: ', error.message)
        res.status(500).json({success, message: "Some internal error occured"});
    }
})


// ROUTE 2: Authencte a user using POST: "/api/auth/login". No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail()
], async(req, res) => {
    let success = false
    const result = validationResult(req);
    if(!result){
        return res.status(400).json({success, error: result.array()});
    }
    let { email, password } = req.body;
    try {
        let user = await User.findOne({email: email});
        if(!user){
            return res.status(400).json({success, message: "Enter correct credentials"});
        }
        const compare = await bcrypt.compare(password, user.password);
        if(!compare){
            return res.status(400).json({success, message: "Enter correct credentials"});
        }
        const Data = {
            user:{
                id: user.id
            }
        }
        const Token = jwt.sign(Data, process.env.JWT_SECRET);
        success = true;
        // console.log(success)
        res.status(200).json({success, Token, name: user.name});
    } catch (error) {
        console.log('Unexpected error: ', error.message)
        res.status(500).json({success, message: "Some internal error occured"});
    }
})


// ROUTE 3: Get user detail using POST: "/api/auth/getuser". Login required
router.post('/getuser', fetchUser, async(req, res) => {
    let success = false
    try {
        const userID = req.user.id;
        const user = await User.findById(userID).select("-password");
        success = true
        res.status(200).json({success, user});
    } catch (error) {
        console.log('Unexpected error: ', error.message)
        res.status(500).json({success, message: "Some internal error occured"});
    }
})

module.exports = router