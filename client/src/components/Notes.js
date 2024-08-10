import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';

const Notes = ({ showAlert, mode }) => {
    const context = useContext(noteContext);
    const { notes, getNote, editNote } = context;
    const ref = useRef(null);
    const refClose = useRef(null);

    const [sortOption, setSortOption] = useState('');
    const [searchTag, setSearchTag] = useState('');
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

    useEffect(() => {
        getNote();
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    }

    const handleSubmit = (e) => {
        console.log("Updating the note...", note);
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refClose.current.click();
        showAlert("Successfully Updated", "success");
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };
    
    const handleSearchChange = (e) => {
        setSearchTag(e.target.value.toLowerCase());
    };

    const filteredAndSortedNotes = [...notes]
        .filter(note => note.tag.toLowerCase().includes(searchTag))
        .sort((a, b) => {
            if (sortOption === '1') {
                return new Date(b.date) - new Date(a.date); // Sort by Latest
            } else if (sortOption === '2') {
                return new Date(a.date) - new Date(b.date); // Sort by Oldest
            } else {
                return 0; // No sorting
            }
        });

    return (
        <>
            <AddNote showAlert={showAlert} mode={mode} />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} minLength={5} required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleSubmit}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container row my-3'>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h2 style={{ color: mode === "light" ? "black" : "white" }}>Your Notes</h2>
                    <select className="form-select ms-4" aria-label="Default select example" style={{ width: "8%", height: "80%" }} onChange={handleSortChange}>
                        {/* <option selected>Sort by</option> */}
                        <option value="1">Latest</option>
                        <option value="2">Oldest</option>
                    </select>
                    <div className="ms-3">
                        <input type="text" class="form-control" id="searchFormControlInput1" placeholder="Search by Tag" onChange={handleSearchChange} />
                    </div>
                </div>
                <div>{filteredAndSortedNotes.length === 0 && "No notes to display"}</div>
                {filteredAndSortedNotes.map((note) => {
                    return <Noteitem key={note._id} showAlert={showAlert} mode={mode} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes;