import React, { useContext, useEffect, useRef, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";

function Home() {
  let navigate = useNavigate()
  const context = useContext(noteContext)
  const { notes, getNotes, updateNotes } = context
  const ref = useRef(null)
  const [show, setShow] = useState(false)
  const [upnote, setUpnote] = useState({ id: "", title: "", description: "", tag: "" })

  useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate('/login')
      return
    }
    getNotes()
    // eslint-disable-next-line
  }, [])

  const updateNote = (note) => {
    setUpnote({ id: note._id, title: note.title, description: note.description, tag: note.tag })
    ref.current.click()
  }

  const handleShow = () => {
    setShow(true)
  }

  const handleClose = () => {
    setShow(false)
    updateNotes(upnote.id, upnote.title, upnote.description, upnote.tag)
  }

  const onChange = (e) => {
    setUpnote({ ...upnote, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className="container">
        <Button variant="primary" onClick={handleShow} ref={ref} hidden>
          Launch demo modal
        </Button>

        <Modal show={show} onHide={() => { setShow(false) }}>
          <Modal.Header closeButton>
            <Modal.Title>Update note</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Updated title" name={"title"} value={upnote.title} onChange={onChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Updated description" name={"description"} value={upnote.description} onChange={onChange} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Tag</Form.Label>
                <Form.Control type="text" placeholder="Updated tag" name={"tag"} value={upnote.tag} onChange={onChange} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => { setShow(false) }}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <div className="container row">
        <h2 className="me-auto my-2">Your notes</h2>
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} update={updateNote} note={note} />
          )
        })}
        </div>
      </div>
    </>
  );
}

export default Home;
