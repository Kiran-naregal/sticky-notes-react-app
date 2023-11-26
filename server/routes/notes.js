const express = require('express');
const router = express.Router();
const Notes = require('../models/notes');
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Create a note using POST: "/createnote". Login required
router.post('/createnote', fetchUser, [
    body('title', 'Please enter title').isLength({min: 3}),
    body('description', 'Please enter description').isLength({min: 5}),
], async(req, res)=>{
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).json({error: result.array()});
    }
    try {
        const { title, description, tag } = req.body;
        let note = await Notes.create({
            title: title,
            description: description,
            tag: tag,
        })
        res.status(200).json(note);
    } catch (error) {
        console.log('Unexpected error: ', error.message)
        res.status(500).json("Some internal error occured");
    }
})

// ROUTE 2: Fetch all nodes of a user using POST: "/fetchallnotes". Login required
router.get('/fetchallnotes', fetchUser, async(req, res)=>{
    try {
        const notes = await Notes.find({user: req.user.id});
        res.json(notes);
    } catch (error) {
        console.log('Unexpected error: ', error.message)
        res.status(500).json("Some internal error occured");
    }
})

module.exports = router