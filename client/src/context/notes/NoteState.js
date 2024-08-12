import React from 'react';
import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    const host = "https://notemaker-5f7g.onrender.com"

    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial);
    
    const atoken = localStorage.getItem("token");

    // Get all notes
    const getNote = async () => {
        // API call
        const response = await fetch(`${host}/api/notes/fetchnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": atoken
            },
        });

        const json = await response.json();
        setNotes(json);
    }

    // Add Note
    const addNote = async (title, description, tag) => {
        // API call
        const response = await fetch(`${host}/api/notes/createnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": atoken
            },
            body: JSON.stringify({ title, description, tag })
        });

        console.log(localStorage.getItem("token"))
        const note = await response.json();
        setNotes(notes.concat(note));
    }

    // Edit Note
    const editNote = async (id, title, description, tag) => {
        // API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": atoken
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = response.json();

        let newNotes = JSON.parse(JSON.stringify(notes));

        // Logic to edit note
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    // Delete Note
    const deleteNote = async (id) => {
        // API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": atoken
            },
        });
        const json = response.json();
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }

    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNote }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;