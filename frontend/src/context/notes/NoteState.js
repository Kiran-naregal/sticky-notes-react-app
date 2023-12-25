import React, { useState } from "react";
import  NoteContext  from "./noteContext";
import axios from "axios";

const NoteState =(props)=>{
    const initalNote = []
    const headers = {
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
    }
    const [notes, setNotes] = useState(initalNote);
    
    const getNotes = async() =>{
        headers.token = localStorage.getItem('token')
        await axios.get(`${process.env.REACT_APP_API}/api/notes/fetchallnotes`, {headers}).then((res)=>{
            setNotes(res.data.notes)
        })
        .catch((error)=>{
            console.log(error)
        })
    }


    const addNote = async(title, description, tag)=>{
        const note ={
            "title": title,
            "description": description,
            "tag": tag,
        }
        await axios.post(`${process.env.REACT_APP_API}/api/notes/createnote`,note, {headers}).then((res)=>{
            setNotes(notes.concat(res.data.note))
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const deleteNote = async(id) =>{
        await axios.delete(`${process.env.REACT_APP_API}/api/notes/deletenote/${id}`, {headers}).then((res)=>{
            const newNote = notes.filter((note)=>{return note._id!==id})
            setNotes(newNote);
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const updateNotes = async(id, title, description, tag) =>{
        let updateNote = {}, i;
        let newNote = JSON.parse(JSON.stringify(notes));
        for(i=0; i<notes.length; i++){
            if(notes[i]._id === id){
                if(notes[i].title !== title) {updateNote.title = title}
                if(notes[i].description !== description) {updateNote.description = description}
                if(notes[i].tag !== tag) {updateNote.tag = tag}
                break;
            }
        }
        newNote[i].title = title;
        newNote[i].description = description;
        newNote[i].tag = tag;
        await axios.put(`${process.env.REACT_APP_API}/api/notes/updatenote/${id}`, updateNote, {headers}).then((res)=>{
            console.log(res)
            setNotes(newNote)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, getNotes, updateNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;