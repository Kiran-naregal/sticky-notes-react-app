const express = require('express');
const router = express.Router();
const Notes = require('../models/notes');
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Create a note using POST: "/api/notes/createnote". Login required
router.post('/createnote', fetchUser, [
    body('title', 'Please enter title').isLength({min: 3}),
    body('description', 'Please enter description').isLength({min: 5}),
], async(req, res)=>{
    let success = false
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).json({success, error: result.array()});
    }
    try {
        const { title, description, tag } = req.body;
        let note = await Notes.create({
            title: title,
            description: description,
            tag: tag,
            user: req.user.id,
        })
        success = true
        res.status(200).json({success, note});
    } catch (error) {
        console.log('Unexpected error: ', error.message)
        res.status(500).json({success, error: "Some internal error occured"});
    }
})

// ROUTE 2: Fetch all nodes of a user using GET: "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchUser, async(req, res)=>{
    let success = false
    try {
        const notes = await Notes.find({user: req.user.id});
        success = true
        res.status(200).json({success, notes});
    } catch (error) {
        console.log('Unexpected error: ', error.message)
        res.status(500).json({success, error: "Some internal error occured"});
    }
})

// ROUTE 3: Update a note using PUT: "/api/notes/updatenote:id". Login required
router.put('/updatenote/:id', fetchUser, async(req, res)=>{
    let success = false
    try {
        const { title, description, tag } = req.body;
        let newNote = {};
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag}
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send({success, error: 'Not found'});
        }
        // console.log(note.user.toString())
        if(note.user.toString() !== req.user.id){
            return res.status(401).send({success, error: 'Not allowed'});;
        }
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
        success = true
        res.status(200).json({success, note});
    } catch (error) {
        console.log('Unexpected error: ', error.message)
        res.status(500).json({success, error: "Some internal error occured"});
    }
})

// ROUTE 4: Delete a note using DELETE: "/api/notes/deletenote:id". Login required
router.delete('/deletenote/:id', fetchUser, async(req, res)=>{
    let success = false
    try {
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send({success, error: 'Not found'});
        }
        if(note.user.toString() !== req.user.id){
            return res.status(401).send({success, error: 'Not allowed'})
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        success = true
        res.status(200).json({success, message:"Note deleted successfully", note:note});
    } catch (error) {
        console.log('Unexpected error: ', error.message)
        res.status(500).json({success, error: "Some internal error occured"});
    }
})

module.exports = router