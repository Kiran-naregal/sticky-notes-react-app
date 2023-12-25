import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

function NoteItem(props) {
    const context = useContext(noteContext)
    const {deleteNote} = context
    return (
        <div className="card center mx-2" style={{width: "18rem"}}>
            <div className="card-body">
                <h5 className="card-title">{props.note.title}</h5>
                <ion-icon className="sx-2" name="trash-outline" onClick={()=>{deleteNote(props.note._id)}} style={{"marginRight":"10px" ,"cursor": "pointer"}} ></ion-icon>
                <ion-icon className="sx-2" name="create-outline" onClick={()=>{props.update(props.note)}} style={{"cursor": "pointer"}} ></ion-icon>
                <p className="card-text">{props.note.description}</p>
            </div>
        </div>
    )
}

export default NoteItem
