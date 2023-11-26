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
            user: req.user.id,
        })
        res.status(200).json(note);
    } catch (error) {
        console.log('Unexpected error: ', error.message)
        res.status(500).json("Some internal error occured");
    }
})

// ROUTE 2: Fetch all nodes of a user using POST: "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchUser, async(req, res)=>{
    try {
        const notes = await Notes.find({user: req.user.id});
        res.json(notes);
    } catch (error) {
        console.log('Unexpected error: ', error.message)
        res.status(500).json("Some internal error occured");
    }
})

// ROUTE 3: Update a note using PUT: "/api/notes/updatenote:id". Login required
router.put('/updatenote/:id', fetchUser, async(req, res)=>{
    try {
        const { title, description, tag } = req.body;
        let newNote = {};
        if(title){newNote.title = title}
        if(description){newNote.description = title}
        if(tag){newNote.tag = tag}
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send('Not found');
        }
        // console.log(note.user.toString())
        if(note.user.toString() !== req.user.id){
            return res.status(401).send('Not allowed');;
        }
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
        res.json(note);
    } catch (error) {
        console.log('Unexpected error: ', error.message)
        res.status(500).json("Some internal error occured");
    }
})

// ROUTE 4: Delete a note using DELETE: "/api/notes/deletenote:id". Login required
router.delete('/deletenote/:id', fetchUser, async(req, res)=>{
    try {
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send('Not found');
        }
        if(note.user.toString() !== req.user.id){
            return res.status(401).send('Not allowed');;
        }
        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({"Success":"Note deleted successfully", note:note});
    } catch (error) {
        console.log('Unexpected error: ', error.message)
        res.status(500).json("Some internal error occured");
    }
})

module.exports = router