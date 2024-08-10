import React, { useContext, useState, useEffect } from 'react';
import noteContext from '../context/notes/noteContext';
import Alert from './Alert';
import styles from "./AddNote.module.css";

const AddNote = ({ mode, showAlert }) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });
    const [sortOption, setSortOption] = useState('');

    useEffect(() => {
        const textarea = document.getElementById('description');

        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key === 'u') {
                e.preventDefault(); // Prevent the default action for the shortcut
                handleBulletInsert();
            }
        };

        textarea.addEventListener('keydown', handleKeyDown);

        // Clean up the event listener when the component unmounts
        return () => {
            textarea.removeEventListener('keydown', handleKeyDown);
        };
    }, [note.description]); // Add note.description as a dependency

    const handleSubmit = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        showAlert("Note Added Successfully", "success");
    }

    const handleUpClick = () => {
        setNote({
            ...note,
            description: note.description.toUpperCase()
        });
    }

    const handleLoClick = () => {
        setNote({
            ...note,
            description: note.description.toLowerCase()
        });
    }

    const handleClearClick = () => {
        setNote({
            ...note,
            description: ""
        });
    }

    const handleExtraSpaces = () => {
        setNote({
            ...note,
            description: note.description.replace(/\s+/g, ' ').trim()
        });
    }

    const handleBulletInsert = () => {
        const textarea = document.getElementById('description');
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        const newText =
            note.description.substring(0, start) +
            '• ' +
            note.description.substring(start, end) +
            note.description.substring(end);

        setNote({
            ...note,
            description: newText,
        });

        // Move cursor to after the inserted bullet point
        setTimeout(() => {
            textarea.setSelectionRange(start + 2, start + 2);
            textarea.focus();
        }, 0);
    };

    const handleBoldClick = () => {
        let textarea = document.getElementById("description");
        let start = textarea.selectionStart;
        let end = textarea.selectionEnd;
        let selectedText = note.description.substring(start, end);

        if (selectedText.length > 0) {
            // Surround the selected text with ** to indicate bold
            let newText = note.description.substring(0, start) + `**${selectedText}**` + note.description.substring(end);
            setNote({
                ...note,
                description: newText
            });

            // Move the cursor to the end of the inserted text
            setTimeout(() => {
                textarea.selectionStart = textarea.selectionEnd = start + selectedText.length + 4;
            }, 0);
        }
    }

    const handleItalicClick = () => {
        let textarea = document.getElementById("description");
        let start = textarea.selectionStart;
        let end = textarea.selectionEnd;
        let selectedText = note.description.substring(start, end);

        if (selectedText.length > 0) {
            let newText = note.description.substring(0, start) + `*${selectedText}*` + note.description.substring(end);
            setNote({ ...note, description: newText });

            setTimeout(() => {
                textarea.selectionStart = textarea.selectionEnd = start + selectedText.length + 2;
            }, 0);
        }
    };

    const handleUnderlineClick = () => {
        let textarea = document.getElementById("description");
        let start = textarea.selectionStart;
        let end = textarea.selectionEnd;
        let selectedText = note.description.substring(start, end);

        if (selectedText.length > 0) {
            let newText = note.description.substring(0, start) + `__${selectedText}__` + note.description.substring(end);
            setNote({ ...note, description: newText });

            setTimeout(() => {
                textarea.selectionStart = textarea.selectionEnd = start + selectedText.length + 4;
            }, 0);
        }
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    return (
        <div className='container my-3'>
            <h2 style={{ color: mode === "light" ? "black" : "white" }}>Add a Note</h2>
            <Alert />
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label" style={{ color: mode === "light" ? "black" : "white" }}>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name='title'
                        style={{ backgroundColor: mode === 'dark' ? '#13466e' : 'white', color: mode === 'dark' ? 'white' : '#042743' }}
                        value={note.title}
                        onChange={onChange}
                        minLength={5}
                        required
                    />
                </div>
                <div className="mb-3">
                    <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                        <label htmlFor="description" className="form-label" style={{ color: mode === "light" ? "black" : "white" }}>Description</label>
                        <div className={styles.tooltipcontainer}>
                            <button
                                type="button"
                                className="btn btn-light btn-sm ms-2 mb-1"
                                onClick={handleBulletInsert}
                            >
                                <i className="fa-solid fa-list"></i>
                            </button>
                            <span className={styles.tooltiptext}>Ctrl + U</span>
                        </div>
                        <div className={styles.tooltipcontainer}>
                            <button
                                type="button"
                                className="btn btn-light btn-sm ms-2 mb-1"
                                onClick={handleBoldClick}
                            >
                                <i class="fa-solid fa-bold"></i>
                            </button>
                        </div>
                        <div className={styles.tooltipcontainer}>
                            <button
                                type="button"
                                className="btn btn-light btn-sm ms-2 mb-1"
                                onClick={handleItalicClick}
                            >
                                <i class="fa-solid fa-italic"></i>
                            </button>
                        </div>
                        <div className={styles.tooltipcontainer}>
                            <button
                                type="button"
                                className="btn btn-light btn-sm ms-2 mb-1"
                                onClick={handleUnderlineClick}
                            >
                                <i class="fa-solid fa-underline"></i>
                            </button>
                        </div>
                    </div>
                    <textarea
                        className="form-control mb-2"
                        id="description"
                        name="description"
                        value={note.description}
                        onChange={onChange}
                        style={{ backgroundColor: mode === 'dark' ? '#13466e' : 'white', color: mode === 'dark' ? 'white' : '#042743' }}
                        rows="8"
                        minLength={5}
                        maxLength={50}
                        required
                    ></textarea>
                    <button disabled={note.description.length === 0} className="btn btn-primary me-1 my-1" onClick={handleUpClick}>Convert to Uppercase</button>
                    <button disabled={note.description.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleLoClick}>Convert to Lowercase</button>
                    <button disabled={note.description.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleClearClick}>Clear Text</button>
                    <button disabled={note.description.length === 0} className="btn btn-primary mx-1 my-1" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label" style={{ color: mode === "light" ? "black" : "white" }}>Tag</label>
                    <input
                        type="text"
                        className="form-control"
                        id="tag"
                        name='tag'
                        style={{ backgroundColor: mode === 'dark' ? '#13466e' : 'white', color: mode === 'dark' ? 'white' : '#042743' }}
                        value={note.tag}
                        onChange={onChange}
                        minLength={5}
                        required
                    />
                </div>
                <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary">
                    Add Note
                </button>
            </form>
        </div>
    )
}

export default AddNote;
