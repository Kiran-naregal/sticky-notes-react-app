import React, { useContext, useState, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";

function AddNote() {
    let navigate = useNavigate();
    const context = useContext(noteContext)
    const { addNote } = context
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/login')
        }
        // eslint-disable-next-line
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
        navigate('/')
    }
    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className="container border rounded-3 my-2" style={{maxWidth: "500px"}}>
            <h2 className="my-2 text-center">Add a note</h2>
            <form onSubmit={handleSubmit} className="d-flex flex-column justify-content-center my-2">
                <div className="mb-2">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={note.title}
                        aria-describedby="emailHelp"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Description
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        value={note.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="tag" className="form-label">
                        Tag
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="tag"
                        name="tag"
                        value={note.tag}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary mx-auto">
                    Add note
                </button>
            </form>
        </div>
    )
}

export default AddNote
